const productManager = require("./clase2_desafio");

const instancia = new productManager(); //creamos la instancia de la clase productManager
console.log(instancia.getProducts()) //inicialmente llamamos al metodo que muestra el array vacio

//agregamos nuevo producto
console.log(instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123",25))
console.log(instancia.getProducts()) //llamamos al array con el producto agregado

//agregamos producto con parametros incompletos, para comprobar que haga la validacion
console.log(instancia.addProduct("producto prueba"))

//agregamos el mismo producto para evaluar el error por código repetido
console.log(instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen","abc123",25))

//llamamos al metodo que busca producto según id ingresado
console.log(instancia.getProductsById(44)) //evaluamos el caso en que el id no exista
console.log(instancia.getProductsById(1))  //evaluamos el caso en que el id existe, devuelve el product indicado