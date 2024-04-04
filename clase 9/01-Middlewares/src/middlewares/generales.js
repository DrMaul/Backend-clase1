export const middleware01 = (req, res, next) => {
    console.log(`Paso por middleware 01 - url: ${req.url} - metodo: ${req.method}`)

    next()
}

export const middleware02 = (req, res, next) => {
    console.log(`Paso por middleware 02`)
    if(req.query.nombre){
        req.query.nombre = req.query.nombre.toUpperCase()
    }

    req.codigo="Codigo123"

    next()
}

export const middleware03 = (req, res, next) => {
    console.log(`Paso por middleware 03`)

    next()
}