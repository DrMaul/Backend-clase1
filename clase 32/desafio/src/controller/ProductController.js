import { isValidObjectId } from "mongoose";
import { productService } from "../services/ProductService.js";
import { CustomError } from "../utils/CustomError.js";
import { TIPOS_ERROR } from "../utils/EErrors.js";


export class ProductController{
    static getProducts = async (req,res,next)=> {
        try {
            try {
            let products = await productService.getProducts()
            let limit = req.query.limit
            if(limit && limit > 0){
                products = products.slice(0, limit)
            }
            res.setHeader('Content-type', 'application/json')
            res.status(200).json({products})
            } catch (error) {
                return CustomError.createError("Error", null,"Internal server Error",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
            }
        } catch (error) {
            next(error)
        }
        
    }

    static getProduct = async (req, res,next)=>{
        try {
            let id = req.params.pid
            if(!isValidObjectId(id)){
                return CustomError.createError("Error ID", null,"Ingresar ID valido de MongoDB",TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
            }
            try {
                let product = await productService.getProductBy({_id:id})
                if (!product){
                    res.json({error: `No existe el producto con ID:${id}`})
                }
                res.setHeader('Content-type', 'application/json')
                return res.status(200).json(product)
            } catch (error) {
                return CustomError.createError("Error", null,"Internal server Error",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
            }
        } catch (error) {
            next(error)
        }
    }

    static createProduct = async (req,res,next)=>{
        try {
            let {title, description, code, price, status, stock, category, thumbnail} = req.body
        
            //Se validan que todos los campos sean obligatorios
            if(!title || !description || !code || !price || !stock || !category){
                return CustomError.createError("Error argumentos invalidos", null,"Todos los campos son obligatorios",TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
            }
            
            //Valido que se cumplan los tipos de datos específicos
            if (typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'string' ||
                    typeof price !== 'number' || typeof stock !== 'number' || typeof category !== 'string') {
                        return CustomError.createError("Error argumentos invalidos", null,"Los tipos de datos no son validos",TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
                }
        
            //Setear "Status" a su valor "true" por defecto
            if (status === undefined) {
                status = true;
            } else if (typeof status !== 'boolean') {
                return CustomError.createError("Error argumentos invalidos", null,"El estado debe ser un valor booleano",TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
            }
            
            //Valido si ya existe el producto en la BBDD
            let existe
            try {
                existe = await productService.getProductBy({code})
            } catch (error) {
                return CustomError.createError("Error", null,"Internal server Error",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
            }
            if(existe){
                return CustomError.createError("Error argumentos invalidos", null,`El producto ${title} con código: ${code} ya existe`,TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
            }
            
            let nuevoProducto
            try {
                nuevoProducto = await productService.addProduct({title, description, code, price, status, stock, category, thumbnail}) 
                
            } catch (error) {
                return CustomError.createError("Error", null,"Internal server Error",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
            }
        
            req.io.emit("nuevoProducto", title)
            res.setHeader('Content-type', 'application/json')
            return res.status(201).json(nuevoProducto)
        } catch (error) {
            next(error)
        }
        
    }

    static updateProduct = async (req,res,next)=> {
        try {
            let id = req.params.pid
        
            if(!isValidObjectId(id)){
                return CustomError.createError("Error ID", null,"Ingresar ID valido de MongoDB",TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
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
                        return CustomError.createError("Error argumentos invalidos", null,`El producto ${aModificar.code} con código: ${aModificar.code} ya existe`,TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
                    }
                } catch (error) {
                    return CustomError.createError("Error", null,"Internal server Error",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
                }
            }
        
            try{
                let productoModificado = await productService.updateProduct(id, aModificar)
                res.setHeader('Content-type', 'application/json')
                return res.status(200).json(productoModificado)
            }catch (error) {
                return CustomError.createError("Error", null,"Internal server Error",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
            }
            
        } catch (error) {
            next(error)
        }
        
    }

    static deleteProduct = async (req,res,next)=> {
        try {
            let id = req.params.pid
        
            if(!isValidObjectId(id)){
                return CustomError.createError("Error ID", null,"Ingresar ID valido de MongoDB",TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
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
                    return CustomError.createError("Error Not Found", null,`No existen productos con id: ${id}`,TIPOS_ERROR.NOT_FOUND)
                }
        
            }catch (error) {
                return CustomError.createError("Error", null,"Internal server Error",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
            }
        
            
            req.io.emit("productoBorrado", productos)
            res.setHeader('Content-type', 'application/json')
            return res.status(200).json({productoEliminado})
        } catch (error) {
            next(error)
        }
    }
}