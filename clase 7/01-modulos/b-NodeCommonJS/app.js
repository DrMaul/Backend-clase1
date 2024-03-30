const Persona = require("./persona")
const varios = require('./varios')
const resta = require('./varios').f2

const {f1, usuarios:users} = require('./varios')

const fs = require('fs')
//fs.promises.writeFile
const fsConPromesas = require("fs").promises

//const path = require("path")
const {join} = require('path')

//direccion absoluta con dirname
let rutaArchivo= join(__dirname, "archivos", "file.txt")
fsConPromesas.writeFile(rutaArchivo, "Hola")
.then(()=> console.log("Archivo creado"))

let persona01 = new Persona("Juan","Perez")

console.log(persona01.saludo())

console.log(varios.f1(10,11))
console.log(varios.usuarios)
let heroe01 = new varios.Heroe("Batman","Bruno Diaz")
console.log(heroe01.verIdentidad())

console.log(users)