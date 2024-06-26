const suma=(...sumandos)=>{
    if(sumandos.length===0) return null
    if(!sumandos.every(numero=>typeof numero=="number")) return "error"
    let resultado=sumandos.reduce((acum, numero)=>acum+=numero , 0)
    return Number(resultado.toFixed(5))
}

module.exports = {suma}