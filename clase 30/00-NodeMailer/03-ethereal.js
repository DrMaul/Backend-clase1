import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'domenico.hettinger16@ethereal.email',
        pass: 'dDHfnyBj4RPv9J8Zsb'
    }
});

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