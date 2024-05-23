import jwt from "jsonwebtoken"
import { SECRET } from "../utils.js";
export const auth = (req, res, next)=> {
    //if (req.session.usuario) cuando habia sessions instalado

    if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Usuario no autenticado`})
    }

    let token = req.headers.authorization.split(" ")[1] //Bearer aadasdlksa

    console.log({token})

    try {
        let usuario = jwt.verify(token, SECRET)
        req.user = usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`${error}`})
    }

    next()
}