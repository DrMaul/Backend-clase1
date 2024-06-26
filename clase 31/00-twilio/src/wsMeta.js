

let respuesta = await fetch("https://graph.facebook.com/v19.0/344027585464175/messages", {
    method:"post",
    headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer EAAL2vnKsaZCsBO8nlwzyYNzNHkN26n4KPMpkMKPpupV3aVz0ohyEdlDWprjef2rPlZBtYPJRR9CZCAfVrVlLfcWCsWjyqVxoii8bF158blXZCRMYLDAorYc3bUQwSFDMl1ZCZAxqCf8IdAXhylHZCw5xgVd3mSAX0ywTv4jzB2TZAbPfNBwcDqrklnqC59zJyJGybCgZABp2wpqsZC7IBwZAcMZD"
    },
    body: JSON.stringify(
        {
            "messaging_product": "whatsapp",
            "to": "541134940534",
            "type": "template",
            "template": {
                "name": "hello_world",
                "language": {
                    "code": "en_US"
                }
            }
        }
    )
})

let data = await respuesta.json()

console.log(JSON.stringify(data))