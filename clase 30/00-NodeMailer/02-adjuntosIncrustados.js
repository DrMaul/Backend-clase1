import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport(
    {
        service:"gmail",
        auth:{
            user:"agusfmartinez99@gmail.com",
            pass:"wzjjrcomicsgwxvm"
        }
    }
)

transporter.sendMail(
    {
        from: "agusfmartinez99@gmail.com",
        to:"agusfmartinez99@gmail.com",
        subject:"prueba de mail con adjuntos incrustados",
        html:`<h2>Mensaje de Prueba</h2><br>
        <p>Parrafo</p>
        <br>
        <img src="img01"/>`,
        attachments: [
            {
                path:"./images/bambinopons.jpg",
                filename:"bambinopons.jpg",
                cid:"img01"
            }
        ]
    }
).then(resultado=>console.log(resultado))
.catch(error=>console.log(error))



export const enviarEmail = async (para, asunto, mensaje, adjuntos)=> {
    return await transporter.sendMail(
        {
            to: para,
            subject: asunto,
            html: mensaje,
            attachments: adjuntos
        }

    )
}

// let resultado = await enviarEmail("agusfmartinez99@gmail.com", "prueba", "mensaje")
// if(resultado.accepted.length>0){
//     console.log("Mail enviado")
// }