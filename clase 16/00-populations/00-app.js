import mongoose from "mongoose"

const app = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://agusfmartinez:CoderCoder@cluster0.zvgrerx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            {
                dbName:"clase14"
            }
        )
        console.log("DB Online")
    } catch (error) {
        console.log("Error al conectar a DB", error.message)
    }


    const cursosModelo = mongoose.model(
        "cursos",
        new mongoose.Schema(
            {
                nombre: String,
                horas: Number,
                docente: String
            },
            {
                timestamps: true
            }
        )
    )

    const alumnoEsquema = new mongoose.Schema(
            {
                nombre: String,
                email: String,
                cursando: { //products
                    type: [
                        {
                            curso: { //product
                                type: mongoose.Types.ObjectId,
                                ref:"cursos" //"products"
                            },
                            //quantity: number
                        }
                    ]
                }
            }
        
    )

    const alumnosModelo = mongoose.model("alumnos", alumnoEsquema)

    await docentesModelo.deleteMany()
    let docente01 = await cursosModelo.create({nombre: "Pepe Luis", titulo: "Lic. en Economia"})
    let docente02 = await cursosModelo.create({nombre: "Luis Lopez", titulo: "Analista en Sistemas"})

    //crear los datos
    await cursosModelo.deleteMany({})

    let curso01 = await cursosModelo.create({nombre: "Calculo II", horas: 8, docente: docente01._id})
    let curso02 = await cursosModelo.create({nombre: "Base de Datos I", horas: 3, docente: docente02._id})

    await alumnosModelo.deleteMany()
    let alumno = await alumnosModelo.create({
        nombre: "Rafa Ledesma", 
        email:"rledesma@mail.com", 
        cursando: [{curso:curso01._id}, {curso: curso02_id}]})

    alumno = await alumnosModelo.findOne().lean()

    alumno = await alumnosModelo.findOne().populate("cursando.curso").lean()

    process.exit()
}