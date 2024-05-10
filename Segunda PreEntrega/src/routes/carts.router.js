import { Router } from "express";
import {CartManagerMONGO as CartManager} from "../dao/CartManagerMONGO.js";
import {ProductManagerMONGO as ProductManager} from "../dao/ProductManagerMONGO.js";
import { isValidObjectId } from "mongoose";
export const router=Router()


let cartManager = new CartManager()
const productManager = new ProductManager()

router.get("/", async (req,res)=> {
    let carts
    try {
        carts = await cartManager.getCarts()

    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
        
    }
    
    let limit = req.query.limit
    if(limit && limit > 0){
        products = products.slice(0, limit)
    }

    res.setHeader('Content-type', 'application/json')
    res.status(200).json({carts})
})

router.post('/',async (req,res)=>{
    let nuevoCarrito
    try {
        nuevoCarrito = await cartManager.createCart() 

        
    } catch (error) {
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json(
            {
                error:`Error inesperado, intente nuevamente`,
                detalle: `${error.message}`
            })
    }

    res.setHeader('Content-type', 'application/json')
    return res.status(201).json({nuevoCarrito})

})

router.get("/:cid", async (req, res)=>{
    let id = req.params.cid
    if(!isValidObjectId(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingresar ID valido de MongoDB`})
    }

    let cart
    try {
        cart = await cartManager.getCartByPopulate({_id:id})
        if (!cart){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No existe el carrito con ID:${id}`})
        }
        
    } catch (error) {
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json(
            {
                error:`Error inesperado, intente nuevamente`,
                detalle: `${error.message}`
            })
    }

    res.setHeader('Content-type', 'application/json')
    return res.status(200).json(cart)

    
})

router.post('/:cid/product/:pid', async (req, res) => {
    let { cid, pid } = req.params;

    if(!isValidObjectId(cid) || !isValidObjectId(pid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingresar ID valido de MongoDB`})
    }

    //Valido si existe el producto en la BBDD
    try {
        let product = await productManager.getProductBy({_id:pid})
        if(!product){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`El producto con id: ${pid} no existe`})
    }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

    try {
        let cart = await cartManager.getCartBy({_id:cid})
  
        if (cart){
            let productExist = cart.products.find(p => p.product == pid);
            if (productExist) {   
                productExist.quantity += 1; 
            } else {
                cart.products.push({product: pid, quantity: 1}); 
            }   
        }
        else {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Carrito con id:${cid} no encontrado`})}

        let productoAgregado = await cartManager.addProductToCart(cid, cart);

        res.setHeader('Content-type', 'application/json')
        return res.status(201).json({productoAgregado})
    } catch (error) {
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json(
            {
                error:`Error inesperado, intente nuevamente`,
                detalle: `${error.message}`
            })
    }
})

router.delete("/:cid", async (req,res)=> {
    let id = req.params.cid

    if(!isValidObjectId(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingresar ID valido de MongoDB`})
    }

    try{
        let cartEliminado = await cartManager.deleteCart(id)
        if(cartEliminado.deletedCount > 0){
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:`Carrito con id: ${id} eliminado`});
        }
        else {
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error:`No existen carritos con id: ${id}`})
        }

    }catch (error) {
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json(
            {
                error:`Error inesperado, intente nuevamente`,
                detalle: `${error.message}`
            })
    }


})

router.delete('/:cid/product/:pid', async (req, res) => {
    let { cid, pid } = req.params;

    if(!isValidObjectId(cid) || !isValidObjectId(pid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingresar ID valido de MongoDB`})
    }

    //Valido si existe el producto en la BBDD
    try {
        let product = await productManager.getProductBy({_id:pid})
        if(!product){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`El producto con id: ${pid} no existe`})
    }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

    //Valido si existe el carrito en la BBDD
    try {
        let cart = await cartManager.getCartBy({_id:cid})
        if(!cart){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`El carrito con id: ${cid} no existe`})
    }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

    try {
        let prodDeleted = await cartManager.deleteProductInCart(cid, pid)
        if(prodDeleted){
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:`Producto ${pid} eliminado del carrito ${cid}`});
        }
 
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }

    
})

router.put("/:cid", async (req,res)=> {
    let cid = req.params.cid
    let products = req.body

    if(!isValidObjectId(cid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingresar ID valido de MongoDB`})
    }

    try {
        let cart = await cartManager.getCartBy({_id:cid})
        if(cart){
            let cartModificado = await cartManager.updateCart(cid, products)
            if(cartModificado){
                res.setHeader('Content-type', 'application/json')
                return res.status(200).json({cartModificado}) 
            }else{
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Error al modificar`})
            }
            
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El carrito con id: ${cid} no existe`})
        }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

})

router.put("/:cid/product/:pid", async (req,res)=> {
    let { cid, pid } = req.params;
    let {quantity} = req.body

    if(!isValidObjectId(cid) || !isValidObjectId(pid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingresar ID valido de MongoDB`})
    }
    
    //Valido si existe el producto en la BBDD
    try {
        let product = await productManager.getProductBy({_id:pid})
        if(!product){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`El producto con id: ${pid} no existe`})
    }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

    try {
        let cart = await cartManager.getCartBy({_id:cid})
        if(cart){
            let prodEnCartModificado = await cartManager.updateProdInCart(cid,pid, quantity)
            if(prodEnCartModificado){
                res.setHeader('Content-type', 'application/json')
                return res.status(200).json({prodEnCartModificado})
            }else{
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Error al modificar`})
            }
            
        }else {
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El carrito con id: ${cid} no existe`})
        }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
    

})