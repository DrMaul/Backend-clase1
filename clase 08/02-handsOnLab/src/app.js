const express = require('express')
const petsRouter = require('./routes/pets.router')
const userRouter = require ('./routes/users.router')

const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/pets', petsRouter)
app.use('/api/users', userRouter)

app.get('/', (req,res)=> {
    res.setHeader('Content-type', 'text/plain')
    res.status(200).send('OK')
})


app.listen(PORT, ()=>console.log(`Servidor online en puerto ${PORT}`))