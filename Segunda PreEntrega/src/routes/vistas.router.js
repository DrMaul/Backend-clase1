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
        if(!cart){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Error al mostrar el carrito`})
        }

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

    let {page = 1, limit = 10, sort} =req.query

    let pageConfig = {page: Number(page), linit: Number(limit), lean:true}
    if (!page || page < 1) page = 1

    let searchOptions = {}
    if(req.query.category){
        searchOptions.category = req.query.category
    }

    if(req.query.title) {
        searchOptions.title = {$regex: req.query.title, $options: "i"}
    }

    if(sort === "asc" || sort === "desc"){
        searchOptions.sort = {price: sort === "asc" ? 1 : -1}
    }

    //let {docs:products, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage}= await productManager.getProductsPaginate(pagina)

    let products = await productManager.getProductsPaginate(searchOptions, pageConfig)

    let {prevPage, nextPage, totalPages, hasPrevPage, hasNextPage} = products
    prevPage = prevPage ? parseInt(prevPage) : null
    nextPage = nextPage ? parseInt(nextPage) : null

    let baseUrl = req.originalUrl.split("?")[0]
    let sortParam = sort ? `&sort=${sort}` : ""

    let prevLink = prevPage ? `${baseUrl}?page=${prevPage}${sortParam}` : null
    let nextLink = nextPage ? `${baseUrl}?page=${nextPage}${sortParam}` : null

    let categories = await productManager.getCategories()

    let reqPage = parseInt(page)
    if(isNaN(reqPage)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Error en Page params`})
    }

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
    
    res.setHeader('Content-type', 'text/html')
    res.status(200).render('realTimeProducts', {
        status: "success",
        payload: products.docs,
        page,
        totalPages, 
        hasPrevPage, 
        hasNextPage, 
        prevPage, 
        nextPage,
        prevLink,
        nextLink,
        categories: categories, 
        cart
    })
})

router.get('/chat', (req, res)=> {
    res.status(200).render('chat')
})

