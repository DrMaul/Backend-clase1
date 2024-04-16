const fs = require ("fs")

class ProductManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            if (fs.existsSync(this.path)) {
                this.products = JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async getProducts(){
        return this.products
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2))
        } catch (error) {
            console.log(error.message)
        }
    }

    async addProduct(product) {
        try {
            const { title, description, code, price, status, stock, category, thumbnail } = product
            if(title && description && price && code && stock && status && category && thumbnail){
                let products = await this.getProducts()
                if(!products.some(prod => prod.code === code)){
    
                    
                    let id = 1
                    if(products.length>0){
                        id = Math.max(...products.map(prodId=>prodId.id))+1
                    }
        
                    product = {
                        id,
                        ...product
                    }
        
                    products.push(product);
                    await this.writeFile(products)
                    return "Producto agregado correctamente"
                }else {return "Error: el código de este producto ya existe."}
            }else {return "Error: ingresar todos los parametros correctamente"}
        } catch (error) {
            console.log(error.message)
        }

        
        
    }

    async getProductsById(idProd){
        try {
            let products = await this.getProducts()
            let prodExistente = products.find(prod => prod.id === idProd)
            if(prodExistente){
                return prodExistente;
            }else {return "Not found"}
        } catch (error) {
            console.log(error.message)
        }
        
    }

    async getProductsByTitle(title){
        try {
            return this.products.find(prod=> prod.title.toLowerCase() === title.toLowerCase())
        } catch (error) {
            console.log(error.message)
        }
    }

    async updateProduct(idProd, newValue){
        try {
            let products = await this.getProducts()
            let index = products.findIndex(prod => prod.id === idProd)
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
            let prodExistente = this.products.some(prod => prod.id === idProd)
            if(prodExistente){
                this.products = this.products.filter(prod => prod.id !== idProd)
                await this.writeFile(this.products)
                return "Producto eliminado correctamente";
            }else {return "Not found"}
            
        } catch (error) {
            console.log(error.message)
        }
        
    }
}



module.exports = ProductManager;