import {Router} from 'express'
import { passportCall } from "../utils.js";

export class CustomRouter{

    constructor(){
        this.router = Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.router
    }

    get(ruta,permisos, ...funciones){ //los ... son aqui el rest
        this.router.get(ruta, passportCall("current", permisos), this.respuestaPersonalizadas,this.accesos(permisos),...this.manejaFunciones(funciones)) //los ... son el spread
    }

    post(ruta,permisos, ...funciones){ //los ... son aqui el rest
        this.router.post(ruta, passportCall("current", permisos), this.respuestaPersonalizadas,this.accesos(permisos),...this.manejaFunciones(funciones)) //los ... son el spread
    }

    //validaciones:
    manejaFunciones=(funciones=[])=> {
        return funciones.map(funcion=>async function(...params){
            try {
                return await funcion(...params)
            } catch (error) {
                return params[1].internalServerError(error.message)
            }
        })
    }


    //middlewares internos:
    respuestaPersonalizadas = (req, res, next)=> {
        res.setHeader('Content-Type','application/json');

        res.success = (mensaje) => res.status(200).json({
            status:"OK", mensaje
        })

        res.successData = (mensaje, data, status) => res.status(status).json({
            status:"OK", mensaje, data
        })

        res.badRequest = (error) => res.status(400).json({
            status:"Bad Request", error
        })

        res.unauthorized = (error) => res.status(401).json({
            status:"Unauthorized", error
        })

        res.forbidden = (error) => res.status(403).json({
            status:"Forbidden", error
        })

        res.internalServerError = (error) => res.status(500).json({
            status:"Internal Server Error", error
        })

        next()
        
    }

    accesos = (permisos=[])=> {
        return (req,res,next)=> {
            if(!Array.isArray(permisos)){
                return res.internalServerError("Error en la parametrizacion de permisos de la ruta")
            }

            permisos = permisos.map(p=>p.toLowerCase())

            if(permisos.includes("public")){
                return next()
            }

            if(!req.user?.rol){
                return res.unauthorized("No existen usuarios autenticados, o hay problemas con el rol")
            }

            if(!permisos.includes(req.user.rol.toLowerCase())){
                return res.forbidden("No tiene privilegios suficientes para acceder")
            }

            next()
        }
    }



}//fin CustomRouter


