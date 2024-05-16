const fs = require("fs")

let rutaArchivo="./archivos/heroes.json"

let heroes= [{
    id: 1,
    heroe:"Iron Man",
    nombre: "Tony Stark",
    categoria: "Marvel"
},
{   
    id:2,
    heroe:"Batman",
    nombre: "Bruce Wayne",
    categoria: "DC"
}]

let nuevoId = 1
const cambios = (clave, valor) => {
    if(clave == "nombre"){
        return valor.toUpperCase()
    }

    if (clave=="id"){
        nuevoId++
        return nuevoId
    }
}
//en el replacer filtramos las propiedades que queremos guardar
fs.writeFileSync(rutaArchivo, JSON.stringify(heroes, cambios, 5))

//se recomienda dejar en null y realizar los cambios x fuera