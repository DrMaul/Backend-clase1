import { usuariosModelo } from "./models/usuarios.modelo.js";

export class UsuariosMongoDAO{

    async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }

    async getBy(filtro={}){
        return await usuariosModelo.findOne(filtro).lean()
    }

    async getByPopulate(filtro={}){
        return await usuariosModelo.findOne(filtro).populate("cart").lean()
    }

    async updatePassword(id, newPassword){
        return await cartsModelo.findByIdAndUpdate({_id: id}, {$set: {password: newPassword}}, {runValidators: true, returnDocument: "after"})
        
    }

}