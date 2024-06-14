import __dirname from './utils.js'
import {mongourl} from './utils.js'
import path from 'path'
import {config} from './config/config.js'

import express from 'express';
import mongoose from 'mongoose';
import {engine} from "express-handlebars"
import sessions from 'express-session'
import MongoStore from 'connect-mongo'
import { initPassport } from './config/passport.config.js';
import passport from 'passport';

import { router as productsRouter} from './routes/products.router.js';
import {router as cartsRouter} from './routes/carts.router.js'
import {router as vistasRouter} from './routes/vistas.router.js'
import { router as sessionsRouter } from './routes/sessions.router.js';

import {Server} from 'socket.io'
import {messagesModelo} from './dao/models/messages.modelo.js'



const PORT = 8080
const app = express()

let io

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'/public')))
app.use(sessions({
    secret: config.SECRET,
    resave: true, 
    saveUninitialized:true,
    store: MongoStore.create({
        ttl:3600,
        mongoUrl: config.MONGO_URL
    })
}))

//paso 2
initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'))


app.use('/api/products', (req,res,next)=>{
    req.io = io

    next()
}, productsRouter)
app.use('/api/carts', cartsRouter)
app.use("/", vistasRouter)
app.use("/api/sessions", sessionsRouter)

let usuarios = []


const server = app.listen(PORT, ()=>console.log(`Servidor online en puerto ${PORT}`))

io = new Server(server)

io.on("connection", socket=>{
    console.log(`Cliente id: ${socket.id} conectado`)

    socket.on("id", async(nombre)=>{
        usuarios.push({id:socket.id, nombre})
        let mensajes=await messagesModelo.find().lean()
        mensajes=mensajes.map(m=>{
            return {nombre: m.user, mensaje: m.message}
        })
        socket.emit("mensajesPrevios", mensajes)
        socket.broadcast.emit("nuevoUsuario", nombre)
    })

    socket.on("mensaje", async(nombre, mensaje)=>{
        await messagesModelo.create({user:nombre, message: mensaje})
        io.emit("nuevoMensaje", nombre, mensaje)
    })

    socket.on("disconnect", ()=>{
        let usuario=usuarios.find(u=>u.id===socket.id)
        if(usuario){
            io.emit("saleUsuario", usuario.nombre)
        }
    })

})

const connDB = async() => {
    try {
        //await mongoose.connect("mongodb+srv://agusfmartinez:CoderCoder@cluster0.zvgrerx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase14")
        await mongoose.connect(config.MONGO_URL)
        console.log("DB Online")
    } catch (error) {
        console.log("Error al conectar a DB", error.message)
    }
}

connDB()

