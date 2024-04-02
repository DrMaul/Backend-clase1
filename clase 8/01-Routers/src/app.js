import express from "express"
import {router as usuariosRouter} from './routes/usuariosRouter'

const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/usuarios", usuariosRouter)


app.listen(PORT, ()=>console.log(`Servidor online en puerto ${PORT}`))