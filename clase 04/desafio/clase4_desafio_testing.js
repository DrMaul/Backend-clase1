const productManager = require("./clase4_desafio");

const instancia = new productManager("./data/products.json"); //creamos la instancia de la clase productManager

const testingFunction = async () => {

    console.log(await instancia.getProducts()) //inicialmente llamamos al metodo que muestra el array vacio

   //agregamos nuevo producto
   console.log(await instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123",25))
   console.log(await instancia.getProducts()) //llamamos al array con el producto agregado

   //agregamos producto con parametros incompletos, para comprobar que haga la validacion
   console.log(await instancia.addProduct("producto prueba"))

   //agregamos el mismo producto para evaluar el error por código repetido
   console.log(await instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123",25))

    //llamamos al metodo que busca producto según id ingresado
    console.log(await instancia.getProductsById(44)) //evaluamos el caso en que el id no exista
    console.log(await instancia.getProductsById(1))  //evaluamos el caso en que el id existe, devuelve el product indicado

    //mostramos el array previo a actualizar
    console.log(await instancia.getProducts())
    //actualizamos el producto con el id indicado (actualizaremos el precio)
    console.log(await instancia.updateProduct(1,400))
    //mostramor el array luego de la actualización
    console.log(await instancia.getProducts())

    //para evaluar el deleteProd, agregaré un nuevo producto
    console.log(await instancia.addProduct("nuevo producto", "Este es un producto prueba", 350, "Sin imagen","abc124",15))
    //mostramos el array con el nuevo producto
    console.log(await instancia.getProducts())
    console.log(await instancia.deleteProduct(2))
    console.log(await instancia.getProducts())
} 

testingFunction()