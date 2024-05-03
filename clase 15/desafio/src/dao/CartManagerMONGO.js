import {cartsModelo} from "./models/carts.modelo.js"

export class CartManagerMONGO {

    async getCarts(filtro={}){
        return await cartsModelo.find(filtro).lean()
    }

    async createCart() {
        await cartsModelo.create({products: []})

    }

    async getCartById(idCart){
        return await cartsModelo.findOne(idCart).lean()
        
    }

    async addProductToCart(cartId, cart) {
        return await cartsModelo.findByIdAndUpdate(cartId, cart, {runValidators: true, returnDocument: "after"}).lean()
        
    }

    async deleteCart(cartId){
        return await cartsModelo.deleteOne({_id:cartId})
    }

    
}
