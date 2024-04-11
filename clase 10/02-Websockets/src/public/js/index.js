let nombre = prompt("Ingresar nombre")

document.title=nombre

const socket = io()


socket.on("saludo", texto => {
    console.log(texto)

    if(nombre){
        socket.emit("id", nombre)
    }

    
})

socket.on("nuevoUsuario", nombre=> {
    console.log(`${nombre} se ha unido al servidor`)
})

const decir=(texto)=> {
    socket.emit("nuevoMensaje", nombre, texto)
}

socket.on("mensaje", (nombre, mensaje)=> {
    console.log(`${nombre} dice: "${mensaje}"`)
})

let parrafoTemperatura= document.getElementById("temperatura")
socket.on("nuevaLecturaTemperatura", temperatura=> {
    parrafoTemperatura.innerHTML = `La nueva temperatura es ${temperatura}°`

})

socket.on("nuevoHeroe", heroe=> {
    console.log(`Se creo a ${heroe}`)
})