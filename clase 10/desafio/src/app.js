const express = require ("express")
const engine = require('express-handlebars').engine
const path = require ('path')
const {router: productsRouter} = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')
const {router: vistasRouter} = require("./routes/vistas.router")
const {Server} = require("socket.io")
const bodyParser = require("body-parser");

const PORT = 8080
const app = express()

let io

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname,'/public')))

app.use('/api/products',bodyParser.json(), (req,res,next)=>{
    req.io = io

    next()
}, productsRouter)
app.use("/", vistasRouter)


app.use('/api/carts', cartsRouter)


//server HTTP
const server = app.listen(PORT, ()=>console.log(`Servidor online en puerto ${PORT}`))

//server Websocket
io = new Server(server)

