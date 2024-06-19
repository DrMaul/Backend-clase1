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
        subject:"prueba de mail simple",
        // text:"mensaje texto plano",
        html:`<h2>Prueba</h2><br>`
    }
).then(resultado=>console.log(resultado))
.catch(error=>console.log(error))