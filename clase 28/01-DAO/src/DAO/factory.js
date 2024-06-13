import { config } from "../config/config.js";
import { Singleton } from "./singleton.js";

export let DAO

switch(config.PERSISTENCE.toUpperCase()){
    case "FS":
        const fsDAO = await import("./UsuariosMemoryDAO.js")
        DAO = fsDAO.UsuariosMemoryDAO
        break;
    case "MONGO":
        Singleton.conectar(config.MONGO_URL, config.DBNAME)
        const mongoDAO = await import ("./UsuariosMongoDAO.js")
        DAO = mongoDAO.UsuariosMongoDAO
        break;
    default:
        throw new Error("Persistencia mal configurada")
        break;
}