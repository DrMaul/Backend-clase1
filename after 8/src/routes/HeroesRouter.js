import { CustomRouter } from "./CustomRouter.js";
import {HeroesManager} from '../managers/HeroesManager.js'
import { m1, m2, m3 } from "../middlewares/varios.js";


let heroesManager = new HeroesManager()

export class HeroesRouter extends CustomRouter{
    init(){
        this.get("/", ["public"],m1,m2,m3,(req,res)=> {
            let heroes = heroesManager.getHeroes()

            //res.setHeader('Content-Type','application/json');
            //return res.status(200).json({heroes});

            return res.success(heroes)
        })

        this.post("/",["admin", "premium"],(req,res)=> {
            let {name, ...otros} = req.body

            if(!name){
                return res.badRequest(`Complete la propiedad Name`)
            }

            let heroes = heroesManager.getHeroes()
            let existe = heroes.find(h=>h.name.toLowerCase() === name.toLowerCase())
            if(existe){
                return res.badRequest(`El heroe ${name} ya qexiste en la BD`)
            }

            let nuevoHeroe = heroesManager.create({name, ...otros})
            return res.successData("Heroe generado correctamente", nuevoHeroe, 201)

        })
    }
} //fin HeroesRouter