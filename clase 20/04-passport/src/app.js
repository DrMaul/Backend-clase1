import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { router as vistasRouter } from './routes/vistas.router.js';
import { router as sessionsRouter } from './routes/sessions.router.js';
import sessions from 'express-session'
import passport from 'passport'
import { initPassport } from '../config/passport.config.js';



const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(sessions({
    secret:"CoderCoder123", resave:true, saveUninitalized:true
}))

//paso 2
initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

app.use("/api/sessions", sessionsRouter)
app.use("/", vistasRouter)




const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

const connDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://agusfmartinez:CoderCoder@cluster0.zvgrerx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            dbName:"clase20"
            })
        console.log(`Conexión a DB establecida`)

    } catch (error) {
        console.log(error.message)        
    }
}

connDB()