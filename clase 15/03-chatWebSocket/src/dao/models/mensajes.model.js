import mongoose from "mongoose";

export const mensajesModelo = mongoose.model(
    "mensajes",
    new mongoose.Schema(
        {
            email:string,
            mensaje:string
        },
        {
            timestamps:true
        }
    )
)