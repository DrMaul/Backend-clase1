import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2'

export const productosModelo = mongoose.model(
    "productos",
    new mongoose.Schema(
        {
            descripcion: String,
            codigo: {type: String, unique: true, required: true},
            precio: Number,
            stock: Number
        },
        {
            timestamps: true
        }
    )

)