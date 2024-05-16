const fs = require("fs")

let rutaArchivo="./archivos/archivoCallback.txt"

let texto2= `Lorem ipsum dolor sit amet consectetur adipiscing elit dui, lobortis quam libero lacinia erat nam ultricies vel, orci habitant dapibus iaculis senectus a justo. Mauris feugiat ornare sociosqu faucibus pharetra justo nascetur magna, elementum molestie taciti in ante quis quam, pellentesque posuere senectus cum varius potenti suspendisse. Magna in aptent mattis auctor rhoncus, curabitur nullam bibendum convallis a, mi pharetra tellus laoreet.`

//lectura con promesas
//fs.writeFile(rutaArchivo,texto2, {encoding:"utf-8"}, (error)=> {})
fs.writeFile(rutaArchivo,texto2, (error)=> {
    if(error){
        console.log(error.message)
        return
    }

    console.log("archivo guardado!")

    fs.readFile(rutaArchivo, {encoding:"utf-8"}, (error,lecturaDelArchivo)=> {
        if(error){
            console.log(error.message)
            return
        }
        console.log(lecturaDelArchivo)

        fs.appendFile(rutaArchivo, "\n\n\tTexto texto pruebas", (error)=> {
            if(error){
                console.log(error.message)
                return
            }
            console.log("archivo actualizado!")

            setTimeout(()=>{
                fs.unlink(rutaArchivo, (error)=> {
                    if(error){
                        console.log(error.message)
                        return
                    }
                    console.log("archivo eliminado")
                })
            },3000)
        })
    })
})



