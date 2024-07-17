import { productosModelo } from "./models/productosModelo.js";

export class ProductManager {

    async getAll(){
        return await productosModelo.find().lean()
    }

    async getOneBy(filtro={}){
        return await productosModelo.findOne(filtro).lean()
    }

    async create(producto) {
        let nuevoProducto = await productosModelo.create(producto)
        return nuevoProducto.toJSON()
    }

    async update(id, producto){
        return await productosModelo.updateOne({_id:id}, producto)
    }
}