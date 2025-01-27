import Categoria from "./Categoria";
import Reserva from './Reserva';
import Usuario from './Usuario';
import Restricao from "./Restricao";
import Inclusao from "./Inclusao";
import Facilidade from "./Facilidade";

class Local {
    id?: number | null;
    imagem: string;
    nome: string;
    descricao: string;
    disponivel: boolean;
    usuario: Usuario;
    qtdMinimaPessoas?: number;
    qtdMaximaPessoas?: number;
    qtdBanheiros?: number;
    qtdAndares?: number;
    valorDiaria: number;
    valorHora?: number;
    valorPessoa?: number;
    endereco: string;
    cidade: string;
    estado: string;
    cep: string;
    restricoes?: Restricao[];
    inclusoes?: Inclusao[];
    facilidades?: Facilidade[];
    reservas?: Reserva[];
    dataCadastro: string;
    categoria: Categoria;

    constructor(
        imagem: string,
        nome: string,
        descricao: string,
        disponivel: boolean,
        usuario: Usuario,
        valorDiaria: number,
        endereco: string,
        cidade: string,
        estado: string,
        cep: string,
        dataCadastro: string,
        categoria: Categoria,
        id?: number,
        qtdMinimaPessoas?: number,
        qtdMaximaPessoas?: number,
        qtdBanheiros?: number,
        qtdAndares?: number,
        valorHora?: number,
        valorPessoa?: number,
        restricoes?: Restricao[],
        inclusoes?: Inclusao[],
        facilidades?: Facilidade[],
        reservas?: Reserva[]
    ) {
        this.id = id;
        this.imagem = imagem;
        this.nome = nome;
        this.descricao = descricao;
        this.disponivel = disponivel;
        this.usuario = usuario;
        this.qtdMinimaPessoas = qtdMinimaPessoas;
        this.qtdMaximaPessoas = qtdMaximaPessoas;
        this.qtdBanheiros = qtdBanheiros;
        this.qtdAndares = qtdAndares;
        this.valorDiaria = valorDiaria;
        this.valorHora = valorHora;
        this.valorPessoa = valorPessoa;
        this.endereco = endereco;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.restricoes = restricoes;
        this.inclusoes = inclusoes;
        this.facilidades = facilidades;
        this.reservas = reservas;
        this.dataCadastro = dataCadastro;
        this.categoria = categoria;
    }
}

export default Local;