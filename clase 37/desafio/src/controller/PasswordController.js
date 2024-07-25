import jwt from 'jsonwebtoken'
import { usuariosModelo } from '../dao/models/usuarios.modelo.js'
import { generaHash, validaPassword } from '../utils.js'
import { mailResetPassword } from '../config/mailing.config.js'
import { CustomError } from "../utils/CustomError.js";
import { TIPOS_ERROR } from "../utils/EErrors.js";
import { UsuariosMongoDAO as UsuariosDAO } from '../dao/UsuariosMongoDAO.js';
import { config } from '../config/config.js';

let JwtSecret = config.SECRET

export class PasswordController{
    static sendMail = async (req,res, next)=> {
        try {
            try {
            let email = req.body.email
            let user = await UsuariosDAO.getBy({email:email})
            if(!user){
                return CustomError.createError("Error", null,`No se encontraron usuarios asociados al mail ${email} `,TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
            }
            
            let token = jwt.sign({email:user.email},JwtSecret,{expiresIn: "1h"})

            mailResetPassword(token, user)

        
            res.setHeader('Content-type', 'application/json')
            res.status(200).json({payload: `Email para reestablecer password enviado a ${user.email}`})
    
        } catch (error) {
            return CustomError.createError("Error", null,"Internal server Error",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
        }
        } catch (error) {
            req.logger.fatal(JSON.stringify({
                name:error.name, 
                message:error.message,
                stack:error.stack
            }, null, 5))
            next(error)
        }
    }

    static sendResetPassword = async (req,res, next)=> {
        try {
            try {
            let token = req.params.token
            jwt.verify(token, JwtSecret, (err,decoded)=> {
                if(err){
                    return res.redirect("/reset-passwor")
                }
                res.render("resetPassword", {token})
            })
            
    
        } catch (error) {
            return CustomError.createError("Error", null,"Internal server Error",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
        }
        } catch (error) {
            req.logger.fatal(JSON.stringify({
                name:error.name, 
                message:error.message,
                stack:error.stack
            }, null, 5))
            next(error)
        }
    }

    static resetPassword = async (req,res, next)=> {
        try {
            try {
            let token = req.params.token
            let password = req.body.password


            let decoded = jwt.verify(token, JwtSecret)
            let user = await UsuariosDAO.getBy({email:email})

            if(!user){
                return CustomError.createError("Error", null,`No se encontraron usuarios asociados al mail ${email} `,TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
            }

            if(!password || !user.password){
                return CustomError.createError("Error", null,`Error al obtener las contraseñas.`,TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
            }

            let mismaPassword = validaPassword(password, user)
            if(mismaPassword){
                return CustomError.createError("Error", null,`Error: La nueva contraseña debe ser diferente a la actual.`,TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
            }
            
            let newPassword = generaHash(password)
            await UsuariosDAO.updatePassword(user._id, newPassword)

            res.setHeader('Content-type', 'application/json')
            res.status(200).json({payload: `Contraseña reestablecida correctamente`})
    
        } catch (error) {
            return CustomError.createError("Error", null,"Internal server Error",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
        }
        } catch (error) {
            req.logger.fatal(JSON.stringify({
                name:error.name, 
                message:error.message,
                stack:error.stack
            }, null, 5))
            next(error)
        }
    }
}