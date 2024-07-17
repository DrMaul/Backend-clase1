import { Router } from 'express';
import mongoose, { isValidObjectId } from 'mongoose';
import { CartManager } from '../dao/CartManager.js';
import { ProductManager } from '../dao/ProductManager.js';
import { auth } from '../middleware/auth.js';
import { ticketModelo } from '../dao/models/ticketModelo.js';
import { enviarMail } from '../utils.js';
import { CustomError } from '../errors/CustomError.js';
import { EERRORES } from '../errors/EErrors.js';
export const router=Router()

const cartManager = new CartManager()
const productManager = new ProductManager()

router.get("/:cid", async (req, res, next)=> {
    try {

        if(req.query.error){
            console.log(forzandoError)
        }
        
        let {cid} = req.params
    
        if(!isValidObjectId(cid)){
            CustomError.generarError("Error cartController", `Carrito invalido`, `Id ${cid} invalido`, EERRORES['Bad Arguments'])
            // res.setHeader('Content-Type','application/json');
            // return res.status(400).json({error:`Ingresar un id de MONGO`})
        }
    
        let carrito = await cartManager.getOneByPopulate({_id:cid})
        if(!carrito){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Carrito inexistente: id ${cid}`})
        }
    
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({carrito});
    } catch (error) {
        next(error)
    }
})

router.get("/:cid/comprar",auth, async (req, res,next)=> {

    try {
        let {cid} = req.params
    
        if(!isValidObjectId(cid)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ingresar un id de MONGO`})
        }

        let carrito = await cartManager.getOneBy({_id:cid})
        if(!carrito){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Carrito inexistente: id ${cid}`})
        }

        if(carrito.productos.length===0){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Carrito con id ${cid} no tiene items`})
        }

        // console.log(carrito.productos)

        let conStock = []
        let sinStock = []
        let total =0

        for(let i =0; i<carrito.productos.length; i++){
            let id = carrito.productos[i].producto
            let cantidad = carrito.productos[i].cantidad
            let producto = await productManager.getOneBy({_id:id})

            if(!producto || producto.stock<cantidad){
                sinStock.push(carrito.productos[i])
                if(producto.stock<cantidad){
                    console.log(`El producto ${producto.descripcion} no tiene stock suficiente. Stock: ${producto.stock} | Cantidad: ${cantidad}`)
                }
            }else{
                conStock.push({
                    id,
                    descripcion: producto.descripcion,
                    precio: producto.precio,
                    stockPrevCompra: producto.stock,
                    stockPostCompra: producto.stock - cantidad,
                    cantidad,
                    subtotal: cantidad * producto.precio
                })
                total += cantidad * producto.precio
                //restar stock prod
                producto.stock = producto.stock - cantidad
                await productManager.update(id, producto)
            }
        }

        if(conStock.length ===0){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Error con los items del carrito ${cid}`})
        }

        carrito.productos = sinStock 
        await cartManager.update(cid, carrito)

        let nroComp= Date.now()
        let fecha = new Date()
        let comprador = req.session.usuario?.email

        let ticket = await ticketModelo.create({
            nroComp, fecha, comprador, items: conStock, total
        })

        let message=`
        Hola ${req.session.usuario?.nombre}
        <br>
        Has registrado la siguiente compra:
        <br>
        N° Ticket: ${nroComp} - Importe: $${total}<br>
        Detalle: ${JSON.stringify(conStock)}
        <br>
        ${sinStock.length>0?`Error al cargar ciertos elementos, validar items.` : ""}
        <br>
        Por favor, contactar a <a href="mailto:agusfmartinez99@gmail.com">Pagos</a> para finalizar la compra.`
        console.log(`Enviar mail a ${comprador}`)
        let resultado = await enviarMail("agusfmartinez99@gmail.com", `Resumen de tu compra`, message)
        console.log(resultado)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({ticket});
    } catch (error) {
        next(error)
    }
    
})

router.post('/:cid/product/:pid',auth, async (req,res)=>{
    let {cid, pid} = req.params

    if(!isValidObjectId(cid) || !isValidObjectId(pid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingresar un id de MONGO`})
    }

    
    let carrito = await cartManager.getOneBy({_id:cid})
    if(!carrito){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Carrito inexistente: id ${cid}`})
    }

    let producto = await productManager.getOneBy({_id:pid})
    if(!producto){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Producto inexistente: id ${pid}`})
    }

    if(producto.stock===0){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Producto ${producto.descripcion} sin stock.`})
    }

    console.log(carrito)
    let indiceProducto = carrito.productos.findIndex(p=>p.producto==pid)
    if(indiceProducto===-1){
        console.log("Nuevo prod")
        carrito.productos.push(
            {producto: pid, cantidad:1}
        )
    }else{
        console.log("Mismo prod, cantidad+1")
        carrito.productos[indiceProducto].cantidad++
    }

    let resultado = await cartManager.update(cid, carrito)
    if(resultado.modifiedCount>0){
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Carrito actualizado"});
    }
    else{
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`No se pudo realizar la actualizacion`
            }
        )
        
    }

    res.setHeader('Content-Type','application/json')
    res.status(200).json({payload:carrito})
})