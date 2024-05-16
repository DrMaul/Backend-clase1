const express = require ("express")

let heroes = [
    {id:1,
    name: "Ironman"},
    {id:2,
    name: "Batman"}
]

const PORT = 3000

const app = express()

app.get("/", (req, res)=>{
    res.send("Home page")
})

app.get("/heroes", (req, res)=>{

    console.log(req.query)
    let datos = heroes
    let limit = req.query.limit
    if(limit && limit > 0){
        datos = datos.slice(0, limit)
    }
    res.json(datos)
})

app.get("/heroes/:id", (req, res)=>{
    let id = req.params.id
    id = Number(id)
    if(isNaN(id)){
        return res.json({error:" Ingresar id numerico"})
    }

    let heroe= heroes.find(h=>h.id===id)
        if(heroe){
            res.json(heroe)
        }else {
            res.json({error: `No existe el heroe ${id}`})
        }
    
    res.json(heroes)
})

app.get("/heroes/nombre/:nombre", (req, res)=>{
    let nombre = req.params.nombre
    id = Number(id)
    

    let heroe= heroes.find(h=>h.name.toLowerCase()===nombre.toLowerCase())
        if(heroe){
            res.json(heroe)
        }else {
            res.json({error: `No existe el heroe ${nombre}`})
        }
    
    res.json(heroes)
})



app.listen(PORT, ()=>console.log(`Servidor online en puerto ${PORT}`))