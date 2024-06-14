export const getNegocios = async (req,res)=> {

    let negocios = "todos los negocios"

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({negocios});
}

export const createNegocio = async (req,res)=> {
    let {nombre, productos} = req.body

    if(!nombre || !productos || !Array.isArray(productos)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete nombre / email`})
    }

    //validar existencia de usuario repetido

    let nuevoUsuario = `nuevo usuario ${nombre}`

    res.setHeader('Content-Type','application/json');
    return res.status(201).json({nuevoUsuario});
}