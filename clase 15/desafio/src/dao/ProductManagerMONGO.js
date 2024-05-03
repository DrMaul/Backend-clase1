import {productsModelo} from "./models/products.modelo.js"

export class ProductManagerMONGO {

    async getProducts(filtro={}){
        return await productsModelo.find(filtro).lean()
    }

    async addProduct(product) {
        return await productsModelo.create(product)
    }

    async getProductsBy(filtro={}){
        return await productsModelo.findOne(filtro).lean()
        
    }

    async updateProduct(idProd, product){
        return await productsModelo.findByIdAndUpdate(idProd, product, {runValidators: true, returnDocument: "after"}).lean()
        
    }

    async deleteProduct(idProd){
        return await productsModelo.deleteOne({_id:idProd})
    }
}


