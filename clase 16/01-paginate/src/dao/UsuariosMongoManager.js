import { usuariosModelo } from "./models/usuariosModelo.js";

export class UsuariosManagerMongo{

    async getAll(){
        return await usuariosModelo.find().lean()
    }

    async getAllPaginate(page=1){//filtro, datos relativos al paginado
        return await usuariosModelo.paginate({}, {limit:10, page, lean:true})
    }
}