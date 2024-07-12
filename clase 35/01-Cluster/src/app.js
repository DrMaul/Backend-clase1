import express from 'express';
import cluster from 'cluster'
import os from 'os'
import { router as pruebasRouter } from './routes/pruebaRouter.js';

if(cluster.isPrimary){
    console.log(`Proceso Prymary - pid: ${process.pid} - Generando workers`)
    for (let index = 0; index < os.cpus().length; index++) {
        cluster.fork()
           
    }
}else{
    const PORT=3000;

    const app=express();

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use('/',pruebasRouter)

    const server=app.listen(PORT,()=>{
        console.log(`Server escuchando en puerto ${PORT} - pid: ${process.pid} - Worker n°: ${cluster.worker.id}`);
    });
}


