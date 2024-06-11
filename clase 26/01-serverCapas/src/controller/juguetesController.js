export const getJuguetes = (req,res)=>{

    let juguetes = "todos los juguetes"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({juguetes})
}

export const createJuguete = (req,res)=>{

    let nuevoJuguete = "nuevo juguete"

    res.setHeader('Content-Type','application/json')
    res.status(201).json({nuevoJuguete})
}