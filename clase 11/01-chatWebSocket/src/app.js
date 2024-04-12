import express from 'express';
import __dirname from './utils.js'
import {Server} from 'socket.io'
import path from 'path'
import {engine} from 'express-handlebars'
import {router as vistasRouter} from './routes/vistas.router.js'
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views",path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname,'/public')))
app.use('/', vistasRouter)

let usuarios= []
let mensajes= []

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const io = new Server(server)

io.on("connection", socket=> {
    console.log(`Se ha conectado un cliente con id ${socket.id}`)

    socket.on("id", nombre=> {
        usuarios.push({id:socket.id, nombre})
        socket.emit("mensajesPrevios", mensajes)
        socket.broadcast.emit("nuevoUsuario", nombre)
    })

    socket.on("mensaje",(nombre, mensaje)=>{
        mensajes.push({nombre, mensaje})
        io.emit("nuevoMensaje", nombre, mensaje)
    })

    socket.on("disconnect",()=> {
        let usuario= usuarios.find(u=> u.id===socket.id)
        if(usuario){
            io.emit("saleUsuario", usuario.nombre)
        }
    })
})