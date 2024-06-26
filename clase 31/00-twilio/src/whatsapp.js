const accountSid = 'AC11ef4dbae99a5986dea6e2520474cf18';
const authToken = '1e737b1b95be992cd5c5de17d868fdcd';
import twilio from 'twilio'
// const client = require('twilio')(accountSid, authToken);
const client = twilio(accountSid, authToken)
client.messages
    .create({
        body: 'Probando Twilio',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491134940534'
    })
    .then(message => console.log(message.sid))
    // .done();