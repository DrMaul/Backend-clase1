import { Router } from 'express';
//import { UsuariosManagerMongo as UsuariosManager} from '../dao/UsuariosManagerMONGO.JS';
import {UsuariosManagerMongo as UsuariosManager} from '../dao/UsuariosMongoManager.js'
export const router=Router()

const usuariosManager = new UsuariosManager()

router.get('/usuarios',async (req,res)=>{

    let {pagina} =req.query
    if(!pagina) pagina = 1

    let {docs:usuarios, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage}= await usuariosManager.getAllPaginate(pagina)

    res.setHeader('Content-Type','text/html')
    res.status(200).render("usuarios", {
        usuarios, page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage
    })
})