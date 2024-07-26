import { UsuariosMongoDAO as UsuariosDAO } from '../dao/UsuariosMongoDAO.js';
import { CustomError } from "../utils/CustomError.js";
import { TIPOS_ERROR } from "../utils/EErrors.js";

export class UserController {
    static cambiarRol = async (req,res, next)=> {
        try {
            try {
            let id = req.params
            let user = await UsuariosDAO.getBy({_id:id})
            if(user.rol.toLowerCase()==="user"){
                await UsuariosDAO.updateRol(user._id, "premium")
                res.setHeader('Content-type', 'application/json')
                res.status(200).json({payload: `El usuario ${user.first_name} actualizó su rol a ${user.rol}`})

            }
            if(user.rol.toLowerCase()==="premium"){
                await UsuariosDAO.updateRol(user._id, "user")
                res.setHeader('Content-type', 'application/json')
                res.status(200).json({payload: `El usuario ${user.first_name} actualizó su rol a ${user.rol}`})

            }
            if(user.rol.toLowerCase()==="admin"){
                return CustomError.createError("Error", null,`No se puede actualizar el rol de Admin`,TIPOS_ERROR.ARGUMENTOS_INVALIDOS)
                
            }
            
            
        } catch (error) {
            return CustomError.createError("Error", null,"Error al actualizar el rol del usuario",TIPOS_ERROR.INTERNAL_SERVER_ERROR)
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
