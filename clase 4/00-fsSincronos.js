const fs = require("fs")

let rutaArchivo="./archivos/archivoSinc.txt"

let texto1= `Lorem ipsum dolor sit amet consectetur adipiscing elit dui, lobortis quam libero lacinia erat nam ultricies vel, orci habitant dapibus iaculis senectus a justo. Mauris feugiat ornare sociosqu faucibus pharetra justo nascetur magna, elementum molestie taciti in ante quis quam, pellentesque posuere senectus cum varius potenti suspendisse. Magna in aptent mattis auctor rhoncus, curabitur nullam bibendum convallis a, mi pharetra tellus laoreet.`

try{
    //ruta, texto, objeto literal (x lo general encoding utf-8)
    //fs.writeFileSync(rutaArchivo, texto1, {encoding:"utf-8"})
    //guardo el archivo de texto
    fs.writeFileSync(rutaArchivo, texto1)

    //consulto si existe el archivo
    if(fs.existsSync(rutaArchivo)){
        let lecturaArchivo = fs.readFileSync(rutaArchivo, {encoding:"utf-8"})
        console.log(lecturaArchivo)
        //agrega datos al archivo (si existe)
        fs.appendFileSync(rutaArchivo, "\n\n\tTexto texto texto")

        setTimeout(()=>{
            //eliminar ficheros
            fs.unlinkSync(rutaArchivo)
            console.log("archivo eliminado")
        },3000)
        
        
}
} catch (error){
    console.log(error.message)
}