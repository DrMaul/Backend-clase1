import jwt from "jsonwebtoken"
import { SECRET } from "../utils.js";
export const auth = (req, res, next)=> {
    //if (req.session.usuario) cuando habia sessions instalado

    /* if(!req.headers.authorization){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Usuario no autenticado`})
    } */

    if(!req.cookies["codercookie"]){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Usuario no autenticado`})
    } 

    let token = req.cookies["codercookie"]

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