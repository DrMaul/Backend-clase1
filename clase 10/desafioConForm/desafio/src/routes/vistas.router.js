const ProductManager = require('../dao/ProductManager');

const Router=require('express').Router;
const router=Router()

let productManager = new ProductManager("./src/data/products.json")

router.get('/', (req,res)=> {
    res.setHeader('Content-type', 'text/html')
    res.status(200).render('home')
})

router.get('/products', async (req,res)=> {
    let products
    try {
        products = await productManager.getProducts()
        
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor, intente más tarde`
            }
        )
        
    }
    res.setHeader('Content-type', 'text/html')
    res.status(200).render('realTimeProducts', {products})
})


module.exports={router}