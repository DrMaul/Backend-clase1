const usuarios = [
    {
        id:1,
        nombre:'Raul'},
    {
        id:2,
        nombre:'Basile'},
    {
        id:3,
        nombre:'Roberto'}
]

const f1=(a,b) => {
    return a+b
}

const f2 = (a,b) =>{
    return a-b
}

class Heroe {
    constructor(nom, alias){
        this.nombre = nom,
        this.alias = alias
    }

    verIdentidad(){
        return `${this.nombre} es: ${this.alias}`
    }
}

module.exports = {Heroe, f1, f2, usuarios}