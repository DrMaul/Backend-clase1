export const errorHanlder = (error, req,res,next)=> {
    console.log(error.message)
    if(error.cause){
        console.log(error.cause)
    }

    if(error.code){
        res.setHeader('Content-Type','application/json');
        return res.status(error.code).json({error:`${error.cause}`})
    }else {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`
            }
        )
        
    }
}