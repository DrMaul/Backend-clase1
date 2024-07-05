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

}