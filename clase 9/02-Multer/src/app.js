import express from "express"
import {router as usuariosRouter} from './routes/usuariosRouter.js'
import {middleware01, middleware02, middleware03} from './middlewares/generales.js'
import {auth} from './middlewares/auth.js' 
import { errorHandler } from "./middlewares/errorHandler.js"

const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/usuarios", usuariosRouter)

app.use(
    middleware01, 
    middleware02,
    (req, res, next)=> {
        console.log('middleware a nivel app "online"')
        next()
    })
  

app.get("/", middleware03,(req, res)=> {

    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send('OK')
})

app.get("/datos", middleware03,(req, res)=> {

    res.setHeader('Content-type', 'application/json')
    return res.status(200).json({
        payload:"Datos",
        nombre: req.query.nombre,
        codigo: req.codigo
    })
})

app.get("/datos2", middleware03,auth,(req, res)=> {

    res.setHeader('Content-type', 'application/json')
    return res.status(200).json({
        payload:"Datos2",
        nombre: req.query.nombre,
        codigo: req.codigo
    })
})

app.get("/datos3", middleware03,(req, res)=> {

    console.log(lalala)
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send('OK')
})

app.use(errorHandler)


app.listen(PORT, ()=>console.log(`Servidor online en puerto ${PORT}`))