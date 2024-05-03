import mongoose from "mongoose";

const cartsCollection = "carts"
const cartSchema = new mongoose.Schema({
    products: {
        type : [
            {
            idProd: { type: mongoose.Types.ObjectId, ref: 'products' },
            quantity: Number
            }
        ]
    }
})

export const cartsModelo = mongoose.model(
    cartsCollection,
    cartSchema
)