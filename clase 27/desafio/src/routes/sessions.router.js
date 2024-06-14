import { Router } from 'express';
import {UsuariosManagerMongo as UsuariosManager} from '../dao/UsuariosManagerMONGO.js'
import { CartManagerMONGO as CartManager } from '../dao/CartManagerMONGO.js';
import passport from 'passport';
import { passportCall } from '../middleware/passportCall.js';
import { auth } from '../middleware/auth.js';
export const router=Router()


const usuariosManager = new UsuariosManager()
const cartManager = new CartManager()

router.get('/error', (req,res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(500).json({error:`Error en la operación`})
})

//paso 3
router.post('/registro',passportCall("registro"),(req,res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Registro exitoso"});

})

router.post('/login',passportCall("login"),(req,res)=>{

    req.session.usuario = req.user

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login exitoso", usuario: req.user});
})

router.get('/github', passport.authenticate("github", {}), (req,res)=> {})

router.get('/callbackGithub', passportCall("github"), (req,res)=> {

    req.session.usuario = req.user

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login exitoso", usuario: req.user});
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

router.get('/current', auth(["admin", "user"]), passportCall("current"), (req,res)=> {
    const usuario = req.user

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuario, login: usuario});
})