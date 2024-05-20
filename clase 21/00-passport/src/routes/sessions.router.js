import { Router } from 'express';
import {UsuariosManagerMongo as UsuariosManager} from '../dao/UsuariosManagerMONGO.js'
import { generaHash, validaPasword } from '../utils.js';
import passport from 'passport';
export const router=Router()


const usuariosManager = new UsuariosManager()

router.get("/error", (req,res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle:`Fallo al autenticar`
        }
    )
    
}) 

//paso 3
router.post('/registro',passport.authenticate("registro",{failureRedirect:"/api/sessions/error"}),async(req,res)=>{

    /* let {nombre, email, password} = req.body

    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete datos de registro`})
    }

    let existe = await usuariosManager.getBy({email})
    if(existe){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ya existe email`})
    }
    password = generaHash(password)

    try {
        let nuevoUsuario = await usuariosManager.create({nombre, email, password, rol:"user"})
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({message:"Registro correcto", nuevoUsuario});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    } */

    //si sale ok passport deja un req.user
    res.setHeader('Content-Type','application/json');
    return res.status(201).json({mensaje:"registro ok", nuevoUsuario: req.user});

})

router.post('/login', async (req,res)=> {
    //let {email, password, web} = req.body
    let {web} = req.body

    /* if(!email || !password){
        if(web){
            return res.redirect(`/login/?error=Complete datos de login`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Complete datos de login`})
        }
    } */

    //otras validaciones
    //para el desafio, preguntar por admincoder@coder.com y contraseña admincod3r123
    //sin son esos datos, devolves nombre "admin", email y rol "admin"

    // let usuario = await usuariosManager.getBy({email, password:generaHash(password)})
    /* let usuario = await usuariosManager.getBy({email})
    if(!usuario){
        if(web){
            return res.redirect(`/login/?error=Credenciales invalidas`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Credenciales invalidas`})
        }
        
    }

    if(!validaPasword(password, usuario.password)){
        if(web){
            return res.redirect(`/login/?error=Credenciales invalidas`)
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Credenciales invalidas`})
        }
    } */

    usuario = {...req.user}
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