import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import useReservaStore from "../store/useReservaStore";
import useUsuarioStore from "../store/useUsuarioStore";
import useAlterarLocal from "../hooks/useAlterarLocal";
import Local from "../interfaces/Local";
import Reserva from "../interfaces/Reserva";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const DateSelector = () => {
  const { addReserva, localReservado, reservas, setReservas } = useReservaStore();
  const { usuario } = useUsuarioStore();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { mutate: alterarLocal, error: errorAlterarLocal } = useAlterarLocal();

  const location = useLocation();
  const navigate = useNavigate();
  const { handleShowToast } = useOutletContext<{ handleShowToast: (toastText: string) => void }>();

  const handleAddReserva = () => {
    if (startDate && endDate && usuario) {
      const newReserva: Reserva = {
        dataInicio: startDate.toISOString(),
        dataFim: endDate.toISOString(),
        usuario: usuario,
      };
      addReserva(newReserva);

      const updatedLocal: Local = {
        ...localReservado,
        reservas: [...(localReservado.reservas || []), newReserva],
      };

      try {
        alterarLocal(updatedLocal);
        handleShowToast("Reserva adicionada com sucesso!");
        setTimeout(() => {
          setReservas([], {} as Local);
          if (location.state && location.state.from) {
            navigate(location.state.from);
          } else {
            navigate("/listar-locais");
          }
        }, 1000);
      } catch (error: any) {
        console.log(error);
      }

      setStartDate(null);
      setEndDate(null);
    }
  };

  if (errorAlterarLocal) throw errorAlterarLocal;

  registerLocale("pt-BR", ptBR);

  // Generate date intervals from reservas
  const excludeDateIntervals = reservas.map((reserva) => ({
    start: parseISO(reserva.dataInicio),
    end: parseISO(reserva.dataFim), // Add 1 day to end date
  }));

  console.log("Exclude Date Intervals:", excludeDateIntervals);

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "20px" }}>
      <h5>Reservar data em {localReservado.nome}</h5>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date as Date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        placeholderText="Select start date"
        locale={"pt-BR"}
        excludeDateIntervals={excludeDateIntervals} // Exclude reserved dates
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date as Date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        placeholderText="Select end date"
        locale={"pt-BR"}
        excludeDateIntervals={excludeDateIntervals} // Exclude reserved dates
      />
      <button className="btn btn-primary" onClick={handleAddReserva}>Add Reserva</button>
    </div>
  );
};

export default DateSelector;