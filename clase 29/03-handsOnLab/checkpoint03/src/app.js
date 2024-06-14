import express from 'express';
import mongoose from 'mongoose'
import { router as usuariosRouter } from './routes/usuariosRouter.js';
import { router as negociosRouter } from './routes/negociosRouter.js';
import { router as ordenesRouter } from './routes/ordenesRouter.js';

router
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/usuarios',usuariosRouter )
app.use('/api/usuarios',negociosRouter )
app.use('/api/usuarios',ordenesRouter )

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const connDB = async()=>{
     try {
         await mongoose.connect('mongodb+srv://agusfmartinez:CoderCoder@cluster0.zvgrerx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=clase29')
         console.log('DB Conectada')
    } catch (error) {
         console.log(`Error al conectar a la DB error`)
    }
}