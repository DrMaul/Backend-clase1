import mongoose from "mongoose";

export const productosModelo = mongoose.model(
    "productos",
    new mongoose.Schema(
        {
            descripcion: String,
            codigo: {type: String, unique: true, required: true},
            precio: Number,
            stock: {
                type: Number, default: 0
            }
        },
        {
            timestamps: true
        }
    )

)