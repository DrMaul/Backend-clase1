import express from 'express';
import { router as routerModelo } from './routes/routerModelo.js';
import { HeroesRouter } from './routes/HeroesRouter.js';
const PORT=3000;

const app=express();
const heroesRouter = new HeroesRouter()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/pruebas", routerModelo)
app.use("/api/heroes", heroesRouter.getRouter())

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
