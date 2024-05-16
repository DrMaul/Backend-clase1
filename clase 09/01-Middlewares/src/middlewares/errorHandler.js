export const errorHandler = (error, req, res, next)=> {

    if(error){
        console.log(error)
        res.setHeader('Content-type', 'application/json')
        return res.status(500).json({
            error:`Error inesperado intente luego`,
            detalle: `${error.message}`

        })
    }

    next()
}