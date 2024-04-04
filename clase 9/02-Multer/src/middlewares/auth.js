export const auth=(req, res, next)=> {

    let {usuario, password} = req.query
    if(!usuario || !password){
        res.setHeader('Content-type', 'application/json')
        return res.status(400).json({error:`Complete usuario / password`})
    }

    if(usuario !== "admin" || password!=="codigo123"){
        res.setHeader('Content-type', 'application/json')
        return res.status(401).json({error:`Credenciales invalidas`})
    }

    next()
}