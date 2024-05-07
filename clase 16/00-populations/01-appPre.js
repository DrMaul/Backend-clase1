import mongoose from "mongoose"
const app = async () => {
    try {
        await mongoose.connect("mongodb+srv://agusfmartinez:CoderCoder@cluster0.zvgrerx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
            dbName:"clase16"
            })
        console.log("DB Online")
    } catch (error) {
        console.log("Error al conectar a DB", error.message)
    }
    
    const docentesModelo = mongoose.model(
        "docentes",
        new mongoose.Schema(
            {
                nombre: String,
                titulo: String
            },
            {
                timestamps: true
            }
        )
    )

    const cursosModelo = mongoose.model(
        "cursos",
        new mongoose.Schema(
            {
                nombre: String,
                horas: Number,
                docente: {
                    type: mongoose.Types.ObjectId, ref:"docentes"
                }
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
                },
                aprobadas: { 
                    type: [
                        {
                            curso: { 
                                type: mongoose.Types.ObjectId,
                                ref:"cursos" 
                            },
                        }
                    ]
                }
            }
        
    )

    alumnoEsquema.pre("findOne", function(){
        this.populate({
            path: "cursando.curso",
            populate: {
                path: "docente",
            }
        })
        .populate({
            path: "aprobadas.curso",
            populate: {
                path: "docente",
            }
        })
        .lean()
    })

    alumnoEsquema.pre("find", function(){
        this.populate({
            path: "cursando.curso",
            populate: {
                path: "docente",
            }
        })
        .populate({
            path: "aprobadas.curso",
            populate: {
                path: "docente",
            }
        })
        .lean()
    })

    const alumnosModelo = mongoose.model("alumnos", alumnoEsquema)

    await docentesModelo.deleteMany()
    let docente01 = await docentesModelo.create({nombre: "Pepe Luis", titulo: "Lic. en Economia"})
    let docente02 = await docentesModelo.create({nombre: "Luis Lopez", titulo: "Analista de Sistemas"})

    //crear los datos
    await cursosModelo.deleteMany({})
    let curso01 = await cursosModelo.create({nombre: "Calculo II", horas: 8, docente: docente01._id})
    let curso02 = await cursosModelo.create({nombre: "Base de Datos I", horas: 3, docente: docente02._id})

    await alumnosModelo.deleteMany()
    let alumno = await alumnosModelo.create({
        nombre: "Rafa Ledesma", 
        email:"rledesma@mail.com", 
        cursando: [{curso:curso01._id}],
        aprobadas: [{curso:curso02._id}]
    })

    alumno = await alumnosModelo.findOne()
    
    console.log(JSON.stringify(alumno,null,5))

    let alumnos = await alumnosModelo.find()
    console.log(JSON.stringify(alumnos,null,5))

    process.exit()
}

app()