import {cartsModelo} from "./models/carts.modelo.js"

export class CartManagerMONGO {

    async getCarts(){
        return await cartsModelo.find().lean()
    }

    async getCartBy(filtro={}){
        return await cartsModelo.findOne(filtro).lean()
    }

    async getCartByPopulate(filtro={}){
        return await cartsModelo.findOne(filtro).populate("products.product").lean()
    }

    async getCartById(idCart){
            return await cartsModelo.findOne(idCart).lean()
        }

    async createCart() {
        return await cartsModelo.create({products:[]})
    }

    async addProductToCart(cartId, cart) {
        return await cartsModelo.updateOne({_id:cartId}, cart)
    }

    async deleteCart(cartId){
        return await cartsModelo.deleteOne({_id:cartId})
    }

    async deleteProductInCart(cartId, prodId){
        return await cartsModelo.updateOne(
            { _id: cartId },
            { $pull: { products: { product: prodId } } }
          );
    }

    async updateCart(idCart, products){
        return await cartsModelo.findByIdAndUpdate(idCart, {$set: {products: products}}, {runValidators: true, returnDocument: "after"})
        
    }

    async updateProdInCart(idCart, prodId,  newQuantity){
        return await cartsModelo.findOneAndUpdate(
            { _id: idCart, 'products.product':prodId },
            { $set: { 'products.$.quantity': newQuantity }},
            {new: true}
          ).populate("products.product");
    }
    
}
