const fs = require("fs")

let rutaArchivo="./archivos/archivoPromises.txt"

let texto3= `Lorem ipsum dolor sit amet consectetur adipiscing elit dui, lobortis quam libero lacinia erat nam ultricies vel, orci habitant dapibus iaculis senectus a justo. Mauris feugiat ornare sociosqu faucibus pharetra justo nascetur magna, elementum molestie taciti in ante quis quam, pellentesque posuere senectus cum varius potenti suspendisse. Magna in aptent mattis auctor rhoncus, curabitur nullam bibendum convallis a, mi pharetra tellus laoreet.`

/**  
fs.promises.writeFile(rutaArchivo, texto3)
    .then(()=>{
        console.log("Archivo guardado")

        fs.promises.readFile(rutaArchivo, {encoding:"utf-8"})
            .then((archivoLeido)=>{
                console.log(archivoLeido)

                //Append y promise hell, no recomendado
            })
            .catch(error => console.log(error.message))
    })
    .catch(error => console.log(error.message))

*/

const app= async()=>{
    await fs.promises.writeFile(rutaArchivo, texto3)
    console.log("Archivo guardado")
    let archivoLeido = await fs.promises.readFile(rutaArchivo, {encoding:"utf-8"})
    console.log(archivoLeido)

    await fs.promises.appendFile(rutaArchivo, "\n\n Texto append")
    console.log("Archivo modificado!")

    setTimeout(async ()=>{
        await fs.promises.unlink(rutaArchivo)
        console.log("Archivo eliminado")
    },3000)
}

//al ser funcion asincrona debo ejecutarla
app()