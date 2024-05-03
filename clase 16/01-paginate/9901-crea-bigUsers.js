//Apuntar a la instancia de mongodb

import mongoose, { mongo } from "mongoose";

const usuariosEsquema = new mongoose.Schema(
    {
    first_name: String, 
    last_name: String,
    email: String,
    gender: String,
    code: Number   
    },
    {
        collection: 'bigUsers'
    }
)

export const usuariosModelo = mongoose.model('usuarios', usuarioEsquema)