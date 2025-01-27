import {create} from "zustand";
import Reserva from "../interfaces/Reserva";
import Local from "../interfaces/Local";

interface ReservaStore {
  nome: string;
  reservaSelecionada: Reserva;
  reservas: Reserva[]; // Add a list of Reserva
  localReservado: Local;

  setNome: (nome: string) => void;
  setReservaSelecionada: (reserva: Reserva) => void;
  setReservas: (reservas: Reserva[], local: Local) => void; // Add method to set the list of Reserva
  addReserva: (reserva: Reserva) => void; // Add method to add a Reserva to the list
}

const useReservaStore = create<ReservaStore>((set:any) => ({
  nome: "",
  reservaSelecionada: {} as Reserva,
  reservas: [], // Initialize the list of Reserva
  localReservado: {} as Local,
  
  setNome: (novoNome: string) => set(() => ({ nome: novoNome })),
  setReservaSelecionada: (novaReservaSelecionada: Reserva) =>
    set(() => ({ reservaSelecionada: novaReservaSelecionada})),
  setReservas: (novasReservas: Reserva[], local: Local) => set(() => ({ reservas: novasReservas, localReservado: local })), // Method to set the list of Reserva
  addReserva: (novaReserva: Reserva) =>
    set((state: ReservaStore) => ({ reservas: [...state.reservas, novaReserva] })), // Method to add a Reserva to the list
}));

export default useReservaStore;