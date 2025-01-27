// import Local from "./Local";
import Usuario from "./Usuario";

class Reserva {
    id?: number;
    dataInicio: Date;
    dataFim: Date;
    usuario?: Usuario;

    constructor(dataInicio: Date, dataFim: Date, id?: number, user?: Usuario) {
        this.id = id;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        user = user;
    }
}

export default Reserva;