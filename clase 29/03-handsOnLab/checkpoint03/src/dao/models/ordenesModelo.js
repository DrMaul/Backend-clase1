import mongoose from 'mongoose'

export const ordenesModelo = mongoose.model(
    "ordenes",
    new mongoose.Schema(
        {
            nroOrden:String,
            fecha: Date,
            usuario: {
                type: mongoose.Types.ObjectId, ref: "usuarios"
            },
            negocio: {
                type: mongoose.Types.ObjectId, ref: "negocios"
            },
            pedido: {
                type: [
                    {
                        id: Numbrer, descrip: String, precio: Number, cantidad: Number
                    }
                ]
            },
            total: Number
        },
        {
            timestamps: true
        }
    )
)