import { heroesModelo } from "./models/heroes.modelo.js";

export class HeroesManagerMongo{

    async getAll(filtro={}){
        return await heroesModelo.find(filtro).lean()
    }

    async getOneBy(filtro={}){
        return await heroesModelo.findOne(filtro).lean()
    }

    async create(heroe){
        return await heroesModelo.create(heroe)
    }
}