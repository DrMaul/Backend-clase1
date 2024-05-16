const Router = require('express').Router
const router = Router()
const UserManager = require('../dao/UserManager')

let userManager = new UserManager()

router.get('/', (req,res)=>{

    //try-catch
    let users ="Devuelve todos los users" //userManager.getAll()

    res.setHeader('Content-type', 'application/json')
    res.status(200).json({users})
})


router.delete('/:id', (req,res)=>{

    let {id} = req.params


    let resultado= `User ${id} eliminado` // userManager.delete(id)
    res.setHeader('Content-type', 'application/json')
    return res.status(201).json(resultado)
})

module.exports = router