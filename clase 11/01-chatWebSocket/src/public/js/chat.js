
Swal.fire({
    title: "Loguearse",
    input: "text",
    text: "Introduce tu nombre",
    inputValidator: (value)=> {
        return !value && "Debe ingresar un nombre"

    },
    allowOutsideClick: false,
  }).then((datos) => {
    let nombre = datos.value
    document.title= nombre

    let inputMensaje= document.getElementById("mensaje")
    let divMensajes = document.getElementById("mensajes")
    inputMensaje.focus()

    const socket=io()

    socket.emit("id", nombre)

    socket.on("nuevoUsuario", nombre=> {
        Swal.fire({
            text:`${nombre} se conectó`,
            toast:true,
            position:"top-right"
        })
    })

    socket.on("mensajesPrevios", mensajes=> {
        mensajes.forEach(m=> {
            divMensajes.innerHTML += `<span><strong>${m.nombre}: </strong><i>${m.mensaje}</i></span><br>`
            divMensajes.scrollTop = divMensajes.scrollHeight
        })
    })

    socket.on("saleUsuario", nombre=> {
        divMensajes.innerHTML += `<span><strong>${m.nombre}: </strong>ha salido del chat</span><br>`
        divMensajes.scrollTop = divMensajes.scrollHeight
    })

    inputMensaje.addEventListener("keyup", e=> {
        e.preventDefault()
        //console.log(e, e.target.value)
        if(e.code==="Enter" && e.target.value.trim().length> 0){
            socket.emit("mensaje", nombre, e.target.value.trim() )
            e.target.value=""
            e.target.focus()
        }
    })

    socket.on("nuevoMensaje", (nombre, mensaje)=>{
        divMensajes.innerHTML += `<span><strong>${nombre}: </strong><i>${mensaje}</i></span><br>`
        divMensajes.scrollTop = divMensajes.scrollHeight

    })


  });

