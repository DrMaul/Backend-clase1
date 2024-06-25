import { isValidObjectId } from "mongoose";
import { productService } from "../services/ProductService.js";


export class ProductController{
    static getProducts = async (req,res)=> {
        let products
        try {
            products = await productService.getProducts()
    
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
        res.status(200).json({products})
    }

    static getProduct = async (req, res)=>{
        let id = req.params.pid
    
        if(!isValidObjectId(id)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ingresar ID valido de MongoDB`})
        }
    
        try {
            let product = await productService.getProductBy({_id:id})
            if (!product){
                res.json({error: `No existe el producto con ID:${id}`})
            }
            res.setHeader('Content-type', 'application/json')
            return res.status(200).json(product)
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
            
        }
        
        
    }

    static createProduct = async (req,res)=>{
        let {title, description, code, price, status, stock, category, thumbnail} = req.body
    
        //Se validan que todos los campos sean obligatorios
        if(!title || !description || !code || !price || !stock || !category){
            res.setHeader('Content-type', 'application/json')
            return res.status(400).json({error:'Todos los campos son obligatorios'})
        }
        
        //Valido que se cumplan los tipos de datos específicos
        if (typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'string' ||
                typeof price !== 'number' || typeof stock !== 'number' || typeof category !== 'string') {
                    res.setHeader('Content-type', 'application/json')
                    return res.status(400).json({ error: 'Los tipos de datos no son válidos' });
            }
    
        //Setear "Status" a su valor "true" por defecto
        if (status === undefined) {
            status = true;
        } else if (typeof status !== 'boolean') {
            res.setHeader('Content-type', 'application/json')
            return res.status(400).json({ error: 'El estado debe ser un valor booleano' });
        }
        
        //Valido si ya existe el producto en la BBDD
        let existe
        try {
            existe = await productService.getProductBy({code})
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
            
        }
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El producto ${title} con código: ${code} ya existe`})
        }
        
        let nuevoProducto
        try {
            nuevoProducto = await productService.addProduct({title, description, code, price, status, stock, category, thumbnail}) 
            
        } catch (error) {
            res.setHeader('Content-type', 'application/json')
            return res.status(500).json(
                {
                    error:`Error inesperado, intente nuevamente`,
                    detalle: `${error.message}`
                })
        }
    
        req.io.emit("nuevoProducto", title)
    
        res.setHeader('Content-type', 'application/json')
        return res.status(201).json(nuevoProducto)
    }

    static updateProduct = async (req,res)=> {
        let id = req.params.pid
    
        if(!isValidObjectId(id)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ingresar ID valido de MongoDB`})
        }
    
        let aModificar = req.body
        if (aModificar._id){
            delete aModificar._id
        }
    
        if(aModificar.code){
            let existe
            try {
                existe = await productService.getProductBy({_id:{$ne:id},code: aModificar.code})
                if(existe){
                    res.setHeader('Content-Type','application/json');
                    return res.status(400).json({error:`El producto ${aModificar.code} con código: ${aModificar.code} ya existe`})
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
        }
    
        try{
            let productoModificado = await productService.updateProduct(id, aModificar)
            res.setHeader('Content-type', 'application/json')
            return res.status(200).json(productoModificado)
        }catch (error) {
            res.setHeader('Content-type', 'application/json')
            return res.status(500).json(
                {
                    error:`Error inesperado, intente nuevamente`,
                    detalle: `${error.message}`
                })
        }
    }

    static deleteProduct = async (req,res)=> {
        let id = req.params.pid
    
        if(!isValidObjectId(id)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ingresar ID valido de MongoDB`})
        }
    
        let productoEliminado
        let productos
        try{
            productos = await productService.getProducts()
            productoEliminado = await productService.deleteProduct(id)
            if(productoEliminado.deletedCount > 0){
                res.setHeader('Content-Type','application/json');
                return res.status(200).json({payload:`Producto con id: ${id} eliminado`});
            }
            else {
                res.setHeader('Content-Type','application/json');
                return res.status(404).json({error:`No existen productos con id: ${id}`})
            }
    
        }catch (error) {
            res.setHeader('Content-type', 'application/json')
            return res.status(500).json(
                {
                    error:`Error inesperado, intente nuevamente`,
                    detalle: `${error.message}`
                })
        }
    
        
        req.io.emit("productoBorrado", productos)
        res.setHeader('Content-type', 'application/json')
        return res.status(200).json({productoEliminado})
    }

}