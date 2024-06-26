import { suma } from "./suma.js"
import colors from 'colors'


let contadorPruebas =0
let contadorOK =0
let resultado
let esperado
console.time("Tiempo de ejecucion del test:")

//----
contadorPruebas++
console.log(`Prueba ${contadorPruebas}: Si la funcion recibe 2 arg retorna la suma de ambos`)
resultado= suma(4,5)
esperado =9
if(resultado===esperado){
    contadorOK++
    console.log(`Prueba correcta`.bgGreen)
}else{
    console.log(`Prueba fallida. Se esperaba ${esperado}, se retorno ${resultado}`)
}
//----
contadorPruebas++
console.log(`Prueba ${contadorPruebas}: Si la funcion no recibe arg retorna null`)
resultado= suma()
esperado =null
if(resultado===esperado){
    contadorOK++
    console.log(`Prueba correcta`.bgGreen)
}else{
    console.log(`Prueba fallida. Se esperaba ${esperado}, se retorno ${resultado}`)
}
//----
contadorPruebas++
console.log(`Prueba ${contadorPruebas}: Si la funcion recibe arg no numericos retorna ERROR`)
resultado= suma(1,"juan")
esperado ="ERROR"
if(resultado===esperado){
    contadorOK++
    console.log(`Prueba correcta`.bgGreen)
}else{
    console.log(`Prueba fallida. Se esperaba ${esperado}, se retorno ${resultado}`)
}
//----
contadorPruebas++
console.log(`Prueba ${contadorPruebas}: Si la funcion recibe n args numericos retorna la suma de todos ellos`)
resultado= suma(1,2,3,4,5)
esperado =15
if(resultado===esperado){
    contadorOK++
    console.log(`Prueba correcta`.bgGreen)
}else{
    console.log(`Prueba fallida. Se esperaba ${esperado}, se retorno ${resultado}`)
}
//----

console.log(`Resultado del test: pruebas realizadas: ${contadorPruebas}`.bgGreen)
console.log(`Pruebas correctas: ${contadorOK} / ${contadorPruebas}`)
console.log(`Pruebas fallidas: ${contadorPruebas - contadorOK} / ${contadorPruebas}`)
console.timeEnd("Tiempo de ejecucion del test:")