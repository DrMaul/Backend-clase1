const fs=require("fs")
const crypto = require("crypto")
const path=require("path")

class UserManager{
    constructor(rutaArchivo){
        this.path=rutaArchivo
    }

    async leerUsuarios(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
        }else{
            return []
        }
    }

    async addUsuario(nombre, email){
        let usuario = await this.leerUsuarios()
    }
}

let userManager = new UserManager("./data/usuarios.json")
//console.log(userManager.leerUsuarios()) FALTA RESOLVER PROMESA

//userManager.leerUsuarios().then(datos=> console.log(datos)) ESTA OK, POCO PRACTICO

module.exports = UserManager
