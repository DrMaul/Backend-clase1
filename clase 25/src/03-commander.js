import {Command, Option} from 'commander'

let programa = new Command()

//programa.option("-flag (formato corto), --palabra <puerto>", "descripcion", valor x def)
programa.option("-p, --puerto <puerto>", "Puerto de conexion del server", 3000)
programa.option("-r, --ruta <ruta archivo>", "Ruta archivo de datos")
programa.option("-d, --debug", "Activa modo debug")
programa.option("-c, --colores [colores...]", "Recibe array de colores")
programa.requiredOption("-u, --usuario <usuario>", "Usuario en curso")

programa.addOption(new Option("-m, --mode <modo>", "Modo de ejecucion del script").choices(["dev", "prod", "test"]).default("dev"))

programa.allowUnknownOption()

programa.parse()
const argumentos= programa.opts()
console.log(argumentos)
const port = argumentos.puerto
console.log(port)
console.log(programa.args)