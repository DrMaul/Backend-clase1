import { heroesModelo } from "./models/heroes.modelo.js";

export class HeroesManagerMongo{

    async getAll(){
        return await heroesModelo.find()
    }
}