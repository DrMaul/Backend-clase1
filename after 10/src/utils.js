import {fileURLToPath} from 'url';
import { dirname } from 'path';
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


const SECRET="CoderCoder123"
//export const generaHash=password=>crypto.createHmac("sha256", SECRET).update(password).digest("hex")
export const generaHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const validaPassword= (password, passwordEncriptada) => bcrypt.compareSync(password, passwordEncriptada)

const transporter = nodemailer.createTransport(
    {
        sercie:"gmail",
        port:"587",
        auth:{
            user:"agusfmartinez99@gmail.com",
            pass:"wzjjrcomicsgwxvm"
        }
    }
)


export const enviarMail = async(to, subject, message)=> {
    return transporter.sendMail(
        {
            from: "Prueba agusfmartinez99@gmail.com",
            to,
            subject,
            html:message
        }
    )
}