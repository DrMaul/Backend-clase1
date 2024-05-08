import { Router } from 'express';
import { ProductManager } from '../dao/ProductManager.js';
import { CartManager } from '../dao/CartManager.js';
import { isValidObjectId } from 'mongoose';
export const router=Router()

const productManager = new ProductManager()
const cartsManager = new CartManager()

router.get("/carrito/:cid", async (req, res)=> {
    let {cid} = req.params

    let carrito = await cartsManager.getOneByPopulate({_id:cid})

    res.setHeader('Content-Type','text/html');
    return res.status(200).render("carrito", {carrito});
})

router.get('/productos',async (req,res)=>{
    let carrito = await cartsManager.getOneBy()

    if(!carrito){
        carrito = await cartsManager.create()
    }

    let productos
    try {
        productos = await productManager.getAll()
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }

    res.setHeader('Content-Type','text/html')
    res.status(200).render("productos", {
        productos,
        carrito
    })
})