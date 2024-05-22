const fs = require ("fs")

class CartManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo
        this.carts = [];
        this.loadCarts();
    }

    async loadCarts() {
        try {
            if (fs.existsSync(this.path)) {
                this.carts = JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }));
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async getCarts(){
        return this.carts
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2))
        } catch (error) {
            console.log(error.message)
        }
    }

    async createCart() {
        let carts = await this.getCarts()
        let id = 1
        if(carts.length>0){
            id = Math.max(...carts.map(cartId=>cartId.id))+1
        }

        const newCart = {
            id,
            products: []
        }

        this.carts.push(newCart);
        await this.writeFile(this.carts)
        return "Producto agregado correctamente"
            

    }

    async getCartById(idCart){
        try {
            let carts = await this.getCarts()
            let cartExistente = carts.find(cart => cart.id === idCart)
            if(cartExistente){
                return cartExistente;
            }else {return "Not found"}
        } catch (error) {
            console.log(error.message)
        }
        
    }

    async addProductToCart(cartId, prodId) {
        try {
            let cartIndex = this.carts.findIndex(cart => cart.id === cartId);
            if (cartIndex === -1) {
                throw new Error('Cart not found');
            }
            let cart = this.carts[cartIndex];
            let products = JSON.parse(await fs.promises.readFile('./src/data/products.json', 'utf-8'));
            let product = products.find(product => product.id === prodId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }

            const prodExistenteIndex = cart.products.findIndex(cartProduct => cartProduct.id === prodId);

            if (prodExistenteIndex !== -1) {
                cart.products[prodExistenteIndex].quantity++;
            } else {
                cart.products.push({ id: prodId, quantity: 1 });
            }

            this.carts[cartIndex] = cart;
            await this.writeFile(this.carts)
            return 'Producto agregado al carrito de manera exitosa';
        } catch (error) {
            console.log(error.message)
        }
    }

    
}

module.exports = CartManager;