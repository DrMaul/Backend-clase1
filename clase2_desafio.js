class productManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
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
        }else {console.log("Error: el código de este producto ya existe.")}
    }

    getProducts(){
        console.log(this.products);
    }

    getProductsById(idProd){
        const prodExistente = this.products.find(prod => prod.id === idProd)
        if(prodExistente){
            console.log(prodExistente);
        }else {console.log("Not found")}
    }
}

const instancia = new productManager(); //creamos la instancia de la clase productManager
instancia.getProducts(); //inicialmente llamamos al metodo que muestra el array vacio

//agregamos nuevo producto
instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123",25);
instancia.getProducts(); //llamamos al array con el producto agregado

//agregamos el mismo producto para evaluar el error por código repetido
instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123",25);

//llamamos al metodo que busca producto según id ingresado
instancia.getProductsById(44);  //evaluamos el caso en que el id no exista
instancia.getProductsById(1);   //evaluamos el caso en que el id existe, devuelve el product indicado