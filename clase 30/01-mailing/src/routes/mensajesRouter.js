import { Router } from 'express';
import { enviarMail, upload } from '../utils.js';
export const router=Router()

router.post('/',upload.array("adjuntos"),async (req,res)=>{

    let {to, subject, message} = req.body
    if(!to || !subject || !message){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Completar datos`})
    }

    let adjuntos=[]
    req.files.forEach(f => {
        adjuntos.push(
            {
                path:f.path,
                filename: f.filename
            }
        )    
    });

    try {
        let resultado = await enviarMail(to, subject, message, adjuntos)
        setTimeout(() => {
            req.files.forEach(f=>{
                fs.unlinkSync(f.path)
            })
        }, 2000);
        if(resultado.accepted.length > 0 && resultado.rejected.length ===0){
            return res.status(200).redirect("/mails.html?mensaje=Mensaje enviado!")
        }else{
            return res.status(400).redirect("/mails.html?mensaje=Error al enviar!")
        }
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }


})

