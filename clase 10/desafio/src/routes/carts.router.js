const Router = require('express').Router
const router = Router()
const CartManager = require('../dao/CartManager.js')

let cartManager = new CartManager('./src/data/carts.json')

router.post('/',async (req,res)=>{

    try {
        let nuevoCarrito = await cartManager.createCart() 

        res.setHeader('Content-type', 'application/json')
        return res.status(201).json(nuevoCarrito)
    } catch (error) {
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json(
            {
                error:`Error inesperado, intente nuevamente`,
                detalle: `${error.message}`
            })
    }

})

router.get("/:cid", async (req, res)=>{
    let id = req.params.cid
    id = Number(id)
    if(isNaN(id)){
        return res.json({error:" Ingresar id numerico"})
    }

    try {
        let cart = await cartManager.getCartById(id)
        if (!cart){
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

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        let { cid, pid } = req.params;
        cid = Number(cid)
        if(isNaN(cid)){
            return res.json({error: `Ingrese un id de carrito numerico`})
        }
        pid = Number(pid)
        if(isNaN(pid)){
            return res.json({error: `Ingrese un id de producto numerico`})
        }

        let productoAgregado = await cartManager.addProductToCart(cid, pid);

        res.setHeader('Content-type', 'application/json')
        return res.status(201).json(productoAgregado)
    } catch (error) {
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json(
            {
                error:`Error inesperado, intente nuevamente`,
                detalle: `${error.message}`
            })
    }
})

module.exports = router