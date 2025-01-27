import { create } from "zustand";
// import UsuarioLogado from "../interfaces/UsuarioLogado";
import Usuario from "../interfaces/Usuario";

interface UsuarioStore {
    usuario: Usuario | null;
    tentouLogar: boolean;
  
    setUsuario: (usuario: Usuario) => void;
    setTentouLogar: (valor: boolean) => void;
}
  
const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuario: null,
    tentouLogar: false,
  
    setUsuario: (usuario: Usuario) => set(() => ({ usuario })),
    setTentouLogar: (valor: boolean) => set(() => ({ tentouLogar: valor })),
}));
  
export default useUsuarioStore;
