import {cartsModelo} from "./models/carts.modelo.js"

export class CartManagerMONGO {

    async getCarts(){
        return await cartsModelo.find().lean()
    }

    async getCartBy(filtro={}){
        return await cartsModelo.find(filtro).lean()
    }

    async getCartById(idCart){
        return await cartsModelo.findOne(idCart).lean()
    }

    async getCartByPopulate(filtro={}){
        return await cartsModelo.findOne(filtro).populate("products.product").lean()
    }

    async createCart() {
        return await cartsModelo.create({products: []})
    }

    /* async addProductToCart(cartId, cart) {
        return await cartsModelo.findByIdAndUpdate(cartId, cart, {runValidators: true, returnDocument: "after"}).lean()
        
    } */

    async addProductToCart(cartId, cart) {
        return await cartsModelo.updateOne({_id:cartId}, cart)
    }

    async deleteCart(cartId){
        return await cartsModelo.deleteOne({_id:cartId})
    }

    
}
