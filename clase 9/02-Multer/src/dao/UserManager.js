//const fs=require("fs")
import fs from 'fs'
//const crypto = require("crypto")
//const path=require("path")
import path from 'path'

export default class UserManager{
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

    async leerById(id){
        let usuarios=await this.leerUsuarios()
        let usuario=usuarios.find(u=>u.id===id)
        return usuario
    }

    async addUsuario(usuario){
        let usuarios = await this.leerUsuarios()

        let id = 1
        if(usuarios.length>0){
            id = Math.max(...usuarios.map(d=>d.id))+1
        }

        usuario= {
            id,
            ...usuario
        }

        usuarios.push(usuario)

        await fs.promises.writeFile(this.path, JSON.stringify(usuarios,null,5))
        return usuario
    }

    async update(id, usuario){
        // actualizan

        return {message:`Se modifico el usuario con id ${id}`}
    }

    async delete(id){
        // borrar del archivo

        return {message:`Se elimino el usuario con id ${id}`}
    }

}

//let userManager = new UserManager("./data/usuarios.json")
//console.log(userManager.leerUsuarios()) FALTA RESOLVER PROMESA

//userManager.leerUsuarios().then(datos=> console.log(datos)) ESTA OK, POCO PRACTICO

//module.exports = UserManager
