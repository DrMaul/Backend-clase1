// export const suma = (a,b)=> {

//     if(!a || !b) return null

//     if(typeof a!="number" || typeof b!="number") return "ERROR"

//     return a+b
// }

// export const suma = (...sumandos)=> {

//     if(sumandos.length === 0) return null

//     for(let i=0; i<sumandos.length ; i++){
//         if(typeof sumandos[i]!="number") return "ERROR"
//     }

//     let resultado = 0
//     for(let i=0; i<sumandos.length ; i++){
//         resultado+=sumandos[i]
//     }
    
//     return resultado
// }

// export const suma = (...sumandos)=> {

//     if(sumandos.length === 0) return null
    
//     let resultado = 0
//     for(let i=0; i<sumandos.length ; i++){
//         if(typeof sumandos[i]!="number") return "ERROR"
//         resultado+=sumandos[i]
//     }
    
//     return resultado
// }

export const suma = (...sumandos)=> {

    if(sumandos.length === 0) return null
    if(!sumandos.every(numero=>typeof numero =="number")) return "ERROR"
    return sumandos.reduce((acum,num)=>acum+=num,0)

}