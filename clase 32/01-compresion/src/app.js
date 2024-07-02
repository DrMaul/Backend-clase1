import express from 'express';
import handlebars from 'express-handlebars'
import zlib from 'zlib'
import compression from 'express-compression'
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(compression({}))
app.use(compression({brotli:{enabled:true}}))
app.use(express.static("./src/public"))
app.use('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/heroes',(req,res)=>{
    res.status(200).render('heroes');
})



app.get('/heroes2',(req,res)=>{

    let texto = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Texto HTML para comprimir</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat laboriosam aspernatur cum ducimus earum aut, nesciunt dolorum officia, animi reprehenderit nisi ab quia, error iusto magnam autem harum perspiciatis ad?
    Quae sed recusandae est dolore reiciendis ut labore, nam tempora quo quasi odio maxime autem quas iste ad totam iure harum odit esse facere, sit numquam minima? Ex, maxime voluptas!
    Delectus quisquam ex dicta, laudantium dignissimos perferendis reprehenderit earum natus. Veniam eligendi, voluptatum aliquid, totam perferendis inventore iste unde aliquam quas repudiandae fugiat nam iusto quibusdam, doloribus aperiam reprehenderit dolorem.
    Sequi error expedita possimus inventore quod natus veritatis est numquam dolorum ullam suscipit a exercitationem laborum animi minima, ipsam dignissimos cum distinctio temporibus voluptatum veniam? Cupiditate aperiam quo quam consequatur.
    At sed recusandae rem tenetur quibusdam nostrum maiores ullam. Deserunt temporibus, magnam soluta cupiditate tempore inventore ea iste, quisquam vero animi necessitatibus sapiente molestiae maiores nobis. Nihil ad nobis molestiae.
    Dolore molestiae modi nobis, et similique nulla consequuntur dolorum quibusdam nostrum delectus cumque ipsum saepe blanditiis dolores debitis perferendis eligendi dicta officiis non earum magnam veniam enim. Natus, officiis magni.
    Rerum quia, ducimus repellat ut libero officia repellendus laborum, veniam consequatur illo ipsum quasi nam eaque minima explicabo odit modi perspiciatis quisquam dicta laboriosam facilis, sed neque! Eligendi, corrupti rerum?
    Temporibus sequi obcaecati, voluptate aperiam fugiat unde enim et. Voluptate unde itaque velit cum a error molestiae modi odio, sapiente fugit illum et pariatur quam obcaecati dolor voluptatum illo at!
    Omnis dolorem asperiores explicabo, vel quod dolores saepe id repellat mollitia a. Sequi, ex. Molestiae eveniet ipsa, repellat sequi consequuntur maxime repudiandae labore at non odio corporis sed placeat dignissimos?
    Praesentium voluptatibus dolorum dolor nisi ex alias nemo ad eaque, libero architecto magni, totam odio velit dolorem perspiciatis optio provident eveniet sunt nostrum ducimus. Obcaecati recusandae provident porro enim odio?
    
    </p>
</body>
</html>`

    let textoComprimido = zlib.gzipSync(texto, {level:6})
    res.setHeader('Content-Encoding','gzip')
    res.setHeader('Content-Type','text/html');
    res.status(200).send(textoComprimido);
})

app.get('/texto1',(req,res)=>{

    let texto = "texto muuuuuuuuuuuuuuuuuuy largo".repeat(50_000)
    // let textoComprimido = zlib.gzipSync(texto, {level:6})
    // let textoComprimido = zlib.gzipSync(texto)
    // let textoComprimido = zlib.deflateSync(texto)
    let textoComprimido = zlib.brotliCompressSync(texto)

    // res.setHeader('Content-Encoding','gzip')
    // res.setHeader('Content-Encoding','deflate')
    res.setHeader('Content-Encoding','br')
    res.setHeader('Content-Type','text/plain')
    res.status(200).send(textoComprimido);
})

app.get('/texto2',(req,res)=>{

    let texto="texto muuuuuuy muuuuuuuy largo".repeat(50_000)

    res.setHeader('Content-Type','text/plain');
    res.status(200).send(texto);
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
