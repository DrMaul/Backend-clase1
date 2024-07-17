import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import sessions from 'express-session'
import { initPassport } from './config/passport.config.js';
import passport from 'passport';
import { errorHanlder } from './middleware/errorHandler.js';


import { router as vistasRouter } from './routes/vistasRouter.js';
import { router as productsRouter } from './routes/productsRouter.js';
import { router as cartsRouter } from './routes/cartRouter.js';
import { router as sessionsRouter } from './routes/sessions.router.js';


const PORT = 3000;

process.on("uncaughtException", error=> {
    console.log("Error no contemplado: ",error.message)
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions({
    secret: "CoderCoder123", resave: true, saveUninitialized:true
}))

//paso 2
initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, './public')));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

app.use("/", vistasRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions", sessionsRouter)

app.use(errorHanlder)


const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

const connDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://agusfmartinez:CoderCoder@cluster0.zvgrerx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            dbName:"afterClass05"
            })
        console.log(`Conexión a DB establecida`)

    } catch (error) {
        console.log(error.message)        
    }
}

connDB()