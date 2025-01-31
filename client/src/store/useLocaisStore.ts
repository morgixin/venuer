import { create } from "zustand";
import Local from "../interfaces/Local";



interface LocaisStore {
    pagina: number;
    tamanho: number;
    nome: string;
    localSelecionado: Local;
    idRemovendo: number | null;
    locaisCarrinho: {local: Local, quantidade: number}[];

    setPagina: (pagina: number) => void;
    setTamanho: (tamanho: number) => void;
    setNome: (nome: string) => void;
    setIdRemovendo: (id: number | null) => void;
    setLocalSelecionado: (local: Local) => void;
    setLocaisCarrinho: (locais: { local: Local, quantidade: number }[]) => void;
    updateQuantidade: (id: number, quantidade: number) => void;

}

const useLocaisStore = create<LocaisStore>((set) => ({
    pagina: 0,
    tamanho: 5,
    nome: "",
    idRemovendo: null,
    localSelecionado: {} as Local,
    locaisCarrinho: [],

    setPagina: (novaPagina: number) => set(() => ({pagina: novaPagina})),
    setTamanho: (novoTamanho: number) => set(() => ({tamanho: novoTamanho})),
    setNome: (novoNome: string) => set(() => ({nome: novoNome})),  
    setIdRemovendo: (id: number| null) => set({ idRemovendo: id }),
    setLocalSelecionado: (novoLocalSelecionado: Local) => set(() => ({localSelecionado: novoLocalSelecionado})),  
    setLocaisCarrinho: (novosLocais: { local: Local, quantidade: number }[]) => set(() => ({ locaisCarrinho: novosLocais })),
    updateQuantidade: (id: number, quantidade: number) => set((state) => ({
        locaisCarrinho: state.locaisCarrinho.map((item) =>
            item.local.id === id ? { ...item, quantidade } : item
        ),
    })),
}))
export default useLocaisStore;

