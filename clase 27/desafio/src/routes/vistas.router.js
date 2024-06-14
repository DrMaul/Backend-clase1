import { Router } from 'express';
import { ProductManagerMONGO as ProductManager} from '../dao/ProductManagerMONGO.js';
import { CartManagerMONGO as CartManager} from '../dao/CartManagerMONGO.js';
import { auth } from '../middleware/auth.js';

export const router=Router()

let productManager = new ProductManager()
let cartManager = new CartManager()

router.get('/', async (req,res)=> {
    res.setHeader('Content-type', 'text/html')
    res.status(200).render('home',{login: req.session.usuario})
})

router.get("/carts/:cid",auth(["admin", "user"]), async (req, res)=> {
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

router.get('/realtimeproducts', async (req,res)=> {
    let products
    try {
        products = await productManager.getProducts()
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
    res.status(200).render('realTimeProducts', {products})
})

router.get('/products', auth(["admin", "user"]),async (req,res)=> {

    let cart= {
        _id: req.session.usuario.cart._id
    }

    let {page = 1, limit = 10, sort} =req.query
    if (page < 1) page = 1

    let pageConfig = {page: Number(page), limit: Number(limit), lean:true}


    let searchOptions = {}
    if(req.query.category){
        searchOptions.category = req.query.category
    }

    if(req.query.title) {
        searchOptions.title = {$regex: req.query.title, $options: "i"}
    }

    if(sort === "asc" || sort === "desc"){
        pageConfig.sort = {price: sort === "asc" ? 1 : -1}
    }

    let products = await productManager.getProductsPaginate(searchOptions, pageConfig)

    let {prevPage, nextPage, totalPages, hasPrevPage, hasNextPage} = products
    prevPage = prevPage ? parseInt(prevPage) : null
    nextPage = nextPage ? parseInt(nextPage) : null

    let baseUrl = req.originalUrl.split("?")[0]
    let sortParam = sort ? `&sort=${sort}` : ""

    let prevLink = prevPage ? `${baseUrl}?page=${prevPage}${sortParam}` : null
    let nextLink = nextPage ? `${baseUrl}?page=${nextPage}${sortParam}` : null

    let categories = await productManager.getCategories()

    /* let reqPage = parseInt(page)
    if(isNaN(reqPage)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Error en Page params`})
    } */

    

    /* let cart
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
        
    } */

    
    
    res.setHeader('Content-type', 'text/html')
    res.status(200).render('products', {
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
        cart,
        usuario:req.session.usuario
    })
})

router.get('/chat', (req, res)=> {
    res.status(200).render('chat')
})

router.get('/registro',(req,res,next)=>{
    if(req.session.usuario){
        return res.redirect("/perfil")
    }
    next()
},(req,res)=>{
    let {error} = req.query

    res.status(200).render('registro', {error, login: req.session.usuario})
})

router.get('/login',auth(["public"]),(req,res,next)=>{
    if(req.session.usuario){
        return res.redirect("/perfil")
    }
    next()
},(req,res)=>{

    let {error, mensaje} = req.query

    res.status(200).render('login', {error, mensaje, login: req.session.usuario})
})

router.get('/perfil',auth(["admin", "user"]),(req,res)=>{

    res.status(200).render('perfil',{
        usuario:req.session.usuario, login: req.session.usuario
    })
})
