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

const entorno = async() => {
    console.log("DIRNAME:", __dirname)
    console.log("RUTA ABSOLUTA A MANO:",__dirname+"/data/usuarios.json")
    console.log("PATH CON path.join:", path.join(__dirname,"data","usuarios.json"))
    //let userManager= new UserManager("./data/usuarios.json") RUTA RELATIVA
    //let userManager= new UserManager(__dirname+"/data/usuarios.json") //RUTA ABSOLUTA
    let userManager= new UserManager(path.join(__dirname,"data","usuarios.json")) //RUTA ABSOLUTA con PATH.JOIN
    try{
        console.log(await userManager.leerUsuarios())
    }catch(error){
        console.log(error.message)
        return
    }
    
}

entorno()