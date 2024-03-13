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


//convertimos de objeto a texto (string) JSON.stringify(objeto,null,espaciado)
fs.writeFileSync(rutaArchivo, JSON.stringify(heroes, null, 5))

//convertimos texto a objeto JSON.parse
let lecturaDatos = JSON.parse(fs.readFileSync(rutaArchivo, {encoding:"utf-8"}))
console.log(lecturaDatos, typeof lecturaDatos, typeof heroes)



