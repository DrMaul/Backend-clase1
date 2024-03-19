const fs = require ("fs")

class ProductManager {
    static idProducto = 0;
    constructor(rutaArchivo) {
        this.path = rutaArchivo

    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2))
        } catch (error) {
            console.log(error.message)
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if(title && description && price && thumbnail && code && stock){
                const products = await this.getProducts()
                if(!products.some(prod => prod.code === code)){
    
                    ProductManager.idProducto = ProductManager.idProducto + 1
                    const id = ProductManager.idProducto 
        
                    const newProduct = {
                        id,
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock
                    }
        
                    products.push(newProduct);
                    await this.writeFile(products)
                    return "Producto agregado correctamente"
                }else {return "Error: el código de este producto ya existe."}
            }else {return "Error: ingresar todos los parametros correctamente"}
        } catch (error) {
            console.log(error.message)
        }

        
        
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                return JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
            }else{
                return []
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async getProductsById(idProd){
        try {
            const products = await this.getProducts()
            const prodExistente = products.find(prod => prod.id === idProd)
            if(prodExistente){
                return prodExistente;
            }else {return "Not found"}
        } catch (error) {
            console.log(error.message)
        }
        
    }

    async updateProduct(idProd, newValue){
        try {
            let products = await this.getProducts()
            const index = products.findIndex(prod => prod.id === idProd)
            if(index !==-1){
                products[index].price = newValue;
                await this.writeFile(products)
                return "Producto actualizado correctamente"
            }else {return "Not found"}
        } catch (error) {
            console.log(error.message)
        }
        
    }

    async deleteProduct(idProd){
        try {
            let products = await this.getProducts()
            const prodExistente = products.some(prod => prod.id === idProd)
            if(prodExistente){
                products = products.filter(prod => prod.id !== idProd)
                await this.writeFile(products)
                return "Producto eliminado correctamente";
            }else {return "Not found"}
            
        } catch (error) {
            console.log(error.message)
        }
        
    }
}



module.exports = ProductManager;