class ticketManager {
    #precioBaseDeGanancia;
    eventos =[];
    constructor() {
        this.#precioBaseDeGanancia = 0.15;
    }

    getEventos() {
        console.log(this.eventos)
    }

    agregarEvento(nombre, lugar, precio, capacidad, fecha) {
        const id = this.eventos.length +1;
        const precioFinal = precio + (precio * this.#precioBaseDeGanancia);
        capacidad = 50;
        fecha = new Date();

        const nuevoEvento = {
            id,
            nombre,
            lugar,
            precio: precioFinal,
            capacidad,
            fecha,
            participantes: [],
        }

        this.eventos.push(nuevoEvento);
    }

    agregarUsuario(idEvento, idUsuario) {
        this.eventos.forEach((evento)=>{
            if(evento.id === idEvento) {
                console.log("coinciden los IDs")
                if(evento.participantes.length==0){
                    console.log("no hay usuario registrado en el Evento")
                    evento.participantes.push(idUsuario);
                }else {console.log("Evento asociado a otro usuario")}
                
            }else {console.log("no coinciden los IDs")}
        })

    }
    ponerEventoEnGira(idEvento, nuevaLoc, nuevaFecha) {
        const eventoExistente = this.eventos.find(evento => evento.id === idEvento);

        if (eventoExistente) {
            const eventoEnGira = {
                ...eventoExistente,
                id: idEvento + 100,
                lugar: nuevaLoc,
                fecha: nuevaFecha,
                participantes: [] 
            };

        this.eventos.push(eventoEnGira);
        }
    }

}

const instancia = new ticketManager();
instancia.getEventos();
instancia.agregarEvento('prueba','lugares',1230)
instancia.getEventos();

instancia.agregarUsuario(1,20)
instancia.agregarUsuario(2,20)
instancia.getEventos();

instancia.ponerEventoEnGira(1,'moron',new Date(2025, 7, 1))
instancia.getEventos();