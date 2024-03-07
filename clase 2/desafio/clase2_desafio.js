class productManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if(title && description && price && thumbnail && code && stock){
            if(!this.products.some(prod => prod.code === code)){
                const id = this.products.length + 1;
    
                const newProduct = {
                    id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
    
                this.products.push(newProduct);

                return "Producto agregado correctamente"
            }else {return "Error: el código de este producto ya existe."}
        }else {return "Error: ingresar todos los parametros correctamente"}
        
    }

    getProducts(){
        return this.products;
    }

    getProductsById(idProd){
        const prodExistente = this.products.find(prod => prod.id === idProd)
        if(prodExistente){
            return prodExistente;
        }else {return "Not found"}
    }
}



module.exports = productManager;