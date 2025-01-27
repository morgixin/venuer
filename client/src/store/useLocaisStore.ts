import { create } from "zustand";
import Local from "../interfaces/Local";

interface LocaisStore {
    pagina: number;
    tamanho: number;
    nome: string;
    localSelecionado: Local;

    setPagina: (pagina: number) => void;
    setTamanho: (tamanho: number) => void;
    setNome: (nome: string) => void;
    setLocalSelecionado: (local: Local) => void;
}

const useLocaisStore = create<LocaisStore>((set) => ({
    pagina: 0,
    tamanho: 5,
    nome: "",
    localSelecionado: {} as Local,

    setPagina: (novaPagina: number) => set(() => ({pagina: novaPagina})),
    setTamanho: (novoTamanho: number) => set(() => ({tamanho: novoTamanho})),
    setNome: (novoNome: string) => set(() => ({nome: novoNome})),  
    setLocalSelecionado: (novoLocalSelecionado: Local) => set(() => ({localSelecionado: novoLocalSelecionado})),  
}))
export default useLocaisStore;

