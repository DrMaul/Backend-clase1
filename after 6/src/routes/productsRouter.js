import { Router } from 'express';
import { ProductManager } from '../dao/ProductManager.js';
import { auth } from '../middleware/auth.js';
export const router=Router()

const productManager = new ProductManager()

router.get('/',async (req,res)=>{

    try {
        let productos = await productManager.getAll()
        res.setHeader('Content-Type','application/json')
        res.status(200).json({productos})
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


router.post('/',auth,async (req,res)=>{
    let {descripcion, codigo, precio, stock} = req.body

    //Se validan que todos los campos sean obligatorios
    if(!descripcion || !precio || !stock || !codigo){
        res.setHeader('Content-type', 'application/json')
        return res.status(400).json({error:'Todos los campos son obligatorios'})
    }
    
    //Valido que se cumplan los tipos de datos específicos
    if (typeof descripcion !== 'string' || typeof precio !== 'number' || typeof stock !== 'number' || typeof codigo !== 'string') {
                res.setHeader('Content-type', 'application/json')
                return res.status(400).json({ error: 'Los tipos de datos no son válidos' });
        }

    
    //Valido si ya existe el producto en la BBDD
    try {
        let existe = await productManager.getOneBy({codigo})
        if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`El producto ${codigo} ya existe`})
        }
    }catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }
    
    
    try {
        let nuevoProducto = await productManager.create({descripcion, precio, stock, codigo}) 
        res.setHeader('Content-type', 'application/json')
        return res.status(201).json({mensaje: "Producto agregado",nuevoProducto})
    } catch (error) {
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json(
            {
                error:`Error inesperado, intente nuevamente`,
                detalle: `${error.message}`
            })
    }

    
})