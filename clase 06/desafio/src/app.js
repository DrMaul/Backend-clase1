const express = require ("express")
const ProductManager= require("./classes/ProductManager")

const PORT = 8080

const app = express()

const productManager= new ProductManager("./src/data/products.json")

app.get("/products", async (req,res)=> {
    let products = await productManager.getProducts()

    let limit = req.query.limit
    if(limit && limit > 0){
        products = products.slice(0, limit)
    }

    res.json(products)
})

app.get("/products/:id", async (req, res)=>{
    let products = await productManager.getProducts()
    let id = req.params.id
    id = Number(id)
    if(isNaN(id)){
        return res.json({error:" Ingresar id numerico"})
    }

    let product= products.find(prod=>prod.id===id)
        if(product){
            res.json(product)
        }else {
            res.json({error: `No existe el producto con ID:${id}`})
        }
    
})

app.listen(PORT, ()=>console.log(`Servidor online en puerto ${PORT}`))