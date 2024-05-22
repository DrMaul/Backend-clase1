import { Router } from 'express';
import {UsuariosManagerMongo as UsuariosManager} from '../dao/UsuariosManagerMONGO.js'
import { generaHash } from '../utils.js';
import { CartManagerMONGO as CartManager } from '../dao/CartManagerMONGO.js';
export const router=Router()


const usuariosManager = new UsuariosManager()
const cartManager = new CartManager()

router.post('/registro',async(req,res)=>{

    let {nombre, email, password, web} = req.body

    if(!nombre || !email || !password){
        if(web){
            return res.redirect(`/registro?error=Complete datos de registro`)
        }else{
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete datos de registro`})
        }
    }

    let existe = await usuariosManager.getBy({email})
    if(existe){
        if(web){
            return res.redirect(`/registro?error=Ya existe email`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existe email`})
        }
        
    }
    password = generaHash(password)

    try {
        
        let carritoNuevo = await cartManager.createCart()
        let nuevoUsuario = await usuariosManager.create({nombre, email, password, rol:"user", cart: carritoNuevo._id})
        if(web){
            return res.redirect(`/login?mensaje=Registro correcto de ${nombre}`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({message:"Registro correcto", nuevoUsuario});
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

router.post('/login', async (req,res)=> {
    let {email, password, web} = req.body

    if(!email || !password){
        if(web){
            return res.redirect(`/login/?error=Complete datos de login`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Complete datos de login`})
        }
    }

    //otras validaciones
    //para el desafio, preguntar por admincoder@coder.com y contraseña admincod3r123
    //sin son esos datos, devolves nombre "admin", email y rol "admin"

    let usuario
    if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
        let cart = await cartManager.getCartBy()
        if(!cart){
        cart = await cartManager.createCart()
        }

        usuario = {
            nombre: "admin",
            email: email,
            rol: "admin",
            cart: cart._id
        }
    }else{
        usuario = await usuariosManager.getByPopulate({email, password:generaHash(password)})
        if(!usuario){
            if(web){
                return res.redirect(`/login/?error=Credenciales invalidas`)
            }else{
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Credenciales invalidas`})
            }
            
        }
        usuario = {...usuario}
    }

    delete usuario.password
    req.session.usuario = usuario

    if(web){
        res.redirect("/perfil")
    }else{
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Login correcto", usuario});
    }

    
})

router.get('/logout', (req,res)=> {
    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle:`${error.message}`
                }
            )
            
        }

    })

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Logout exitoso"});
})