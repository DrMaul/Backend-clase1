import { usuariosModelo } from "./models/usuariosModelo.js"

export class UsuariosMongoDAO{


    async get(){
        return await usuariosModelo.find().lean() 
        // return this.usuarios
    }

    async getBy(filtro){
        return await usuariosModelo.findOne(filtro).lean()
    }

    async create(usuario){

        let nuevoUsuario = await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON() 
    }

}