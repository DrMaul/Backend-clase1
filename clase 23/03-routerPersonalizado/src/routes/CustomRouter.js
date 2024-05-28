import {Router} from 'express'

export class CustomRouter{

    constructor(){
        this.router = Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.router
    }

    get(ruta, ...funciones){ //los ... son aqui el rest
        this.router.get(ruta, (req, res, next)=> {
            console.log("Validacion interna del custom ruter")

            res.setHeader('Content-Type','application/json');
            res.success = (mensaje) => res.status(200).json({
                status:"OK", mensaje
            })
            res.badRequest = (error) => res.status(400).json({
                status:"Bad Request", error
            })

            next()
            
        }, ...funciones) //los ... son el spread
    }

    post(ruta, ...funciones){ //los ... son aqui el rest
        this.router.post(ruta, ...funciones) //los ... son el spread
    }
}//fin CustomRouter