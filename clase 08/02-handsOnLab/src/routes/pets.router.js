const Router = require('express').Router
const router = Router()
const PetsManager = require('../dao/PetsManager')

let petsManager = new PetsManager()

router.get('/', (req,res)=>{

    //try-catch
    let pets ="Devuelve todas las mascotas" //petsManager.getAll()

    res.setHeader('Content-type', 'application/json')
    res.status(200).json({pets})
})

router.post('/',(req,res)=>{

    let nuevoPet = "Nuevo pet generado"//petsManager.create(pet)
    res.setHeader('Content-type', 'application/json')
    return res.status(201).json(nuevoPet)
})

router.put('/:id', (req,res)=>{

    let {id} = req.params

    //obtener modificaciones del body y validarlas
    let petModificado= `Pet ${id} modificado` // petsManager.update(id, modificaciones)
    res.setHeader('Content-type', 'application/json')
    return res.status(201).json(petModificado)
})

router.delete('/:id', (req,res)=>{

    let {id} = req.params


    let resultado= `Pet ${id} eliminado` // petsManager.delete(id)
    res.setHeader('Content-type', 'application/json')
    return res.status(201).json(resultado)
})

module.exports = router