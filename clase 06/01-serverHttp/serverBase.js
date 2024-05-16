const http = require("http")

const PORT = 3000

//request lo que llega en la peticion, response lo que devolvemos
const server = http.createServer((req, res)=> {

    if(req.url=="/heroes"){
        res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"})
        res.end("Heroes page")
    }

    //weiteHead: mensaje para el header. cod 200: operacion exitosa
    res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"})
    res.end("Servidor básico con módulo http de Nodejs")
})

server.listen(PORT, ()=> {
    console.log(`Server online en el puerto ${PORT}`)
})