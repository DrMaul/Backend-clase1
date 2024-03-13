class productManager {
    static idProducto = 0;
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if(title && description && price && thumbnail && code && stock){
            if(!this.products.some(prod => prod.code === code)){

                productManager.idProducto = productManager.idProducto + 1
                const id = productManager.idProducto 
    
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

    updateProduct(idProd, newValue){
        const index = this.products.findIndex(prod => prod.id === idProd)
        if(index !==-1){
            
            this.products[index].price = newValue;

            return "Producto actualizado correctamente"
        }else {return "Not found"}
    }

    deleteProduct(idProd){
        const prodExistente = this.products.some(prod => prod.id === idProd)
        if(prodExistente){
            this.products = this.products.filter(prod => prod.id !== idProd)
            return "Producto eliminado correctamente";
        }else {return "Not found"}
    }
}



module.exports = productManager;