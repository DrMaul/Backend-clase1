const colors = require("colors")

const saludo = (nombre ="")=>{
    return `Hola ${nombre}, bienvenido!`.rainbow
}


module.exports={saludo}