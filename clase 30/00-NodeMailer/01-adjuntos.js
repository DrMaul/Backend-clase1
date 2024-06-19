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
        subject:"prueba de mail con adjunto",
        html:`<h2>Mensaje de Prueba</h2><br>
        <p>Parrafo</p>`,
        attachments: [
            {
                path:"./images/bambinopons.jpg",
                filename:"bambinopons.jpg"
            }
        ]
    }
).then(resultado=>console.log(resultado))
.catch(error=>console.log(error))

