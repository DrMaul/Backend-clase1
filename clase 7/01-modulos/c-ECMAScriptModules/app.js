import __dirname from './utils.js'
import Persona from './persona.js'
import {usuarios, f1 as suma, f2 as resta, Heroe} from './varios.js'
import * as varios from './varios.js'
import Villano from './varios.js'

import {writeFileSync as grabarArchivo} from "fs"

import {join} from 'path'

//con ECMA modules no se puede usar dirname
let rutaAarchivo = join(__dirname,"archivos","file.txt")
grabarArchivo(rutaAarchivo, "CHAU")

let persona01 = new Persona("Juan","Perez")
console.log(persona01.saludo())

console.log(usuarios)
console.log(suma(10,5))

let heroe01 = new Heroe ("Robin", "Ricardo Tapia")
console.log(heroe01.verIdentidad())

console.log(varios.f1(2,2))

let heroe02 = new varios.Heroe("Batman", "Bruno Diaz")
console.log(heroe02.verIdentidad())