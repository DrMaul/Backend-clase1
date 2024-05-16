const express = require ("express")

const PORT = 3000

const app = express()

app.get("/", (req, res)=>{
    res.send("Server con Express!")
})

app.get("/contacto", (req, res)=>{
    res.send("Página de contacto")
})

app.listen(PORT, ()=>console.log(`Servidor online en puerto ${PORT}`))