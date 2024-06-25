import { CartMongoDAO } from "../dao/CartMongoDAO.js"



class CartService{
    constructor(dao){
        this.cartDAO = dao
    }

    async getCarts() {
        return await this.cartDAO.get()
    }

    async getCartById(id) {
        return await this.cartDAO.getBy(id)
    }

    async getCartByPopulate(cid) {
        return await this.cartDAO.getByPopulate({_id:cid}) 
    }

    async createCart() {
        return await this.cartDAO.create()
    }

    async addProductToCart(cartId, cart) {
        return await this.cartDAO.updateCart(cartId, cart)
    }

    async deleteCart(id){
        return await this.cartDAO.delete(id)
    }

    async deleteProductInCart(cartId, prodId){
        return await this.cartDAO.deleteProduct(cartId,prodId)
    }

    async updateCart(idCart, products){
        return await this.cartDAO.updateCart(idCart,products)
        
    }

    async updateProdInCart(idCart, prodId,  newQuantity){
        return await this.cartDAO.updateProduct(idCart,prodId,newQuantity)
    }
    
}

export const cartService = new CartService(new CartMongoDAO())