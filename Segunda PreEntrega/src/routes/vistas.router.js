import { Router } from 'express';
import { ProductManagerMONGO as ProductManager} from '../dao/ProductManagerMONGO.js';
import { CartManagerMONGO as CartManager} from '../dao/CartManagerMONGO.js';

export const router=Router()

let productManager = new ProductManager()
let cartManager = new CartManager()

router.get('/', async (req,res)=> {
    res.setHeader('Content-type', 'text/html')
    res.status(200).render('home', {})
})

router.get("/carts/:cid", async (req, res)=> {
    let {cid} = req.params

    let cart 
    try {
        cart = await cartManager.getCartByPopulate({_id:cid})
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor, intente más tarde`
            }
        )
    }

    res.setHeader('Content-Type','text/html');
    return res.status(200).render("cart", {cart});
})

router.get('/products', async (req,res)=> {
    console.log("Estamos en /products")

    let {pagina} =req.query
    if(!pagina) pagina = 1

    let {docs:products, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage}= await productManager.getProductsPaginate(pagina)


    let cart
    try {
        cart = await cartManager.getCartByPopulate()
        if(!cart){
        console.log("Se crea nuevo Cart")
        cart = await cartManager.createCart()
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
    
    console.log(cart)
    console.log(cart._id)

    
    res.setHeader('Content-type', 'text/html')
    res.status(200).render('realTimeProducts', {products, cart , page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage})
})

router.get('/chat', (req, res)=> {
    res.status(200).render('chat')
})

