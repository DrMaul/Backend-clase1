import nodemailer from 'nodemailer'
import { config } from './config.js';
import { logger } from '../utils.js';



const transporter = nodemailer.createTransport(
    {
        service:"gmail",
        port:"587",
        auth:{
            user:config.MAIL_NODEMAILER,
            pass: config.PASSWORD_NODEMAILER
        }
    }
)

export const enviarMail = async (purchaser, code,amount, purchase_datetime, stockProducts)=>{


    // Generar el HTML para la lista de productos
    const productsListHTML = stockProducts.map(product => `
        <li>${product.title} - $${product.price}</li>
    `).join('');

    const mailOptions = {
        from: "agusfmartinez99@gmail.com",
        to: purchaser,
        subject: `Ticket de compra - Cod: ${code}`,
        html: `
            <h1>Ticket de compra - Cod: ${code}</h1><br>
            <h2>Productos:</h2><br>
            <ul>${productsListHTML}</ul><br>
            <h3>Precio final: $${amount}</h3><br>
            <p>Fecha de compra: ${purchase_datetime}</p><br>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        // console.log('Correo enviado con éxito');
        logger.debug('Correo enviado con éxito')
    } catch (error) {
        // console.error('Error al enviar el correo:', error);
        logger.error('Error al enviar el correo: '+error)
    }
}
