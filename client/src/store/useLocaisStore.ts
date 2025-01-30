import { create } from "zustand";
import Local from "../interfaces/Local";

interface LocaisStore {
    pagina: number;
    tamanho: number;
    nome: string;
    localSelecionado: Local;
    idRemovendo: number | null;

    setPagina: (pagina: number) => void;
    setTamanho: (tamanho: number) => void;
    setNome: (nome: string) => void;
    setIdRemovendo: (id: number | null) => void;
    setLocalSelecionado: (local: Local) => void;
}

const useLocaisStore = create<LocaisStore>((set) => ({
    pagina: 0,
    tamanho: 5,
    nome: "",
    idRemovendo: null,
    localSelecionado: {} as Local,

    setPagina: (novaPagina: number) => set(() => ({pagina: novaPagina})),
    setTamanho: (novoTamanho: number) => set(() => ({tamanho: novoTamanho})),
    setNome: (novoNome: string) => set(() => ({nome: novoNome})),  
    setIdRemovendo: (id: number| null) => set({ idRemovendo: id }),
    setLocalSelecionado: (novoLocalSelecionado: Local) => set(() => ({localSelecionado: novoLocalSelecionado})),  
}))
export default useLocaisStore;

