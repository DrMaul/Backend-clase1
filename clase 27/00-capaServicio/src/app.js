import express from 'express';
import mongoose from 'mongoose'
import { router as usuariosRouter } from './routes/usuariosRouter.js';
import { router as juguetesRouter } from './routes/juguetesRouter.js';
import { config } from './config/config.js';
// const PORT=3000;
const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/usuarios", usuariosRouter)
app.use("/api/juguetes", juguetesRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const connDB = async()=>{
     try {
        await mongoose.connect('mongodb+srv://agusfmartinez:CoderCoder@cluster0.zvgrerx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase27')
        console.log('DB Conectada')
    } catch (error) {
        console.log(`Error al conectar a la DB error`)
    }
}

connDB()