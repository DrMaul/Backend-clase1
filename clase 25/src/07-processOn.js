process.on("exit", code => {
    console.log({code})
    console.log(`El sistema finaliza borrando archivos temporales`)
})

process.on("uncaughtException", error => {
    console.log(`Ocurrio un error: ${error.message}`)
})

let cont = 0
let intervalo = setInterval(() => {
    cont++
    console.log(`Proceso nro ${cont}`)
    
    if(cont===4){
        //throw new Error("error forzado")
        console.log(prueba)
    }

    if(cont===7){
        process.exit(-1)
    }

    if(cont === 8){
        clearInterval(intervalo)
    }
}, 300);