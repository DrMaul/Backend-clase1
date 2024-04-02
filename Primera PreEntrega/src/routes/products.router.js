const Router = require('express').Router
const router = Router()
const ProductManager = require('../dao/ProductManager')

let productManager = new ProductManager('./src/data/products.json')

router.get("/", async (req,res)=> {
    let products = await productManager.getProducts()

    let limit = req.query.limit
    if(limit && limit > 0){
        products = products.slice(0, limit)
    }

    res.setHeader('Content-type', 'application/json')
    res.status(200).json({products})
})

router.get("/:pid", async (req, res)=>{
    let id = req.params.pid
    id = Number(id)
    if(isNaN(id)){
        return res.json({error:" Ingresar id numerico"})
    }

    try {
        let product = await productManager.getProductsById(id)
        if (!product){
            res.json({error: `No existe el producto con ID:${id}`})
        }
        res.setHeader('Content-type', 'application/json')
        return res.status(201).json(product)
    } catch (error) {
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json(
            {
                error:`Error inesperado, intente nuevamente`,
                detalle: `${error.message}`
            })
    }
    
    
})

router.post('/',async (req,res)=>{
    let {title, description, code, price, status, stock, category, thumbnails} = req.body

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
    
    try {
        let nuevoProducto = await productManager.addProduct({title, description, code, price, status, stock, category, thumbnails}) 

        res.setHeader('Content-type', 'application/json')
        return res.status(201).json(nuevoProducto)
    } catch (error) {
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json(
            {
                error:`Error inesperado, intente nuevamente`,
                detalle: `${error.message}`
            })
    }

})

router.put("/:pid", async (req,res)=> {
    let id = req.params.pid
    id = Number(id)
    if(isNaN(id)){
        return res.json({error: `Ingrese un id numerico`})
    }

    let {title, description, code, price, status, stock, category, thumbnails} = req.body

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

    try{
        let productoModificado = await productManager.updateProduct(id, {title, description, code, price, status, stock, category, thumbnails})
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
})

router.delete("/:pid", async (req,res)=> {
    let id = req.params.pid

    id = Number(id)

    if(isNaN(id)){
        return res.json({error: `Ingrese un id numerico`})
    }

    try{
        let productoEliminado = await productManager.deleteProduct(id)
        res.setHeader('Content-type', 'application/json')
        return res.status(200).json(productoEliminado)
    }catch (error) {
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json(
            {
                error:`Error inesperado, intente nuevamente`,
                detalle: `${error.message}`
            })
    }
})

module.exports = router