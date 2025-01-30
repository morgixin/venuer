import { create } from "zustand";
// import Local from "../interfaces/Local";
import Categoria from "../interfaces/Categoria";

interface CategoriasStore {
    categorias: Categoria[];

    setCategorias: (novaListaCategorias: Categoria[]) => void;
}

const useCategoriasStore = create<CategoriasStore>((set) => ({
    categorias: [],
        
    setCategorias: (novaListaCategorias: Categoria[]) => set(() => ({categorias: novaListaCategorias}))
}))
export default useCategoriasStore;

