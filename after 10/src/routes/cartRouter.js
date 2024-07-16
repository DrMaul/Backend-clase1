import { Router } from 'express';
import mongoose, { isValidObjectId } from 'mongoose';
import { CartManager } from '../dao/CartManager.js';
import { ProductManager } from '../dao/ProductManager.js';
import { auth } from '../middleware/auth.js';
export const router=Router()

const cartManager = new CartManager()
const productManager = new ProductManager()

router.get("/:cid", async (req, res)=> {
    let {cid} = req.params

    if(!isValidObjectId(cid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingresar un id de MONGO`})
    }

    let carrito = await cartManager.getOneByPopulate({_id:cid})
    if(!carrito){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Carrito inexistente: id ${cid}`})
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({carrito});
})

router.get("/:cid/comprar", async (req, res)=> {
    let {cid} = req.params
    
    if(!isValidObjectId(cid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingresar un id de MONGO`})
    }

    let carrito = await cartManager.getOneByPopulate({_id:cid})
    if(!carrito){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Carrito inexistente: id ${cid}`})
    }

    if(carrito.productos.length===0){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Carrito con id ${cid} no tiene items`})
    }

    console.log(carrito.productos)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({carrito});
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