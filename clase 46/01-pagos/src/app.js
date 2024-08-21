import express from 'express';
import stripe from 'stripe'
const PORT=3000;

//3- conectar stripe
const stripeInstance = stripe("claveSecretaStripe")

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.post('/create-payment-intent',async (req,res)=>{
    let {importe} = req.body
    //14,99 -> 1499

    //4- generar desde el backend el paymentIntent
    const paymentIntent = await stripeInstance.paymentIntents.create(
        {
            amount: importe * 100,
            currency:"usd"
        }
    )

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({paymentIntent});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
