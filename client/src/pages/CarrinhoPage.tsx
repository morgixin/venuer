import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useUsuarioStore from "../store/useUsuarioStore";
import Local from "../interfaces/Local";
import useLocaisStore from "../store/useLocaisStore";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

const DateSelector = () => {
  // const { addReserva, localReservado, reservas, setReservas } = useReservaStore();
  const { locaisCarrinho, localSelecionado, setLocalSelecionado, setLocaisCarrinho, setIdRemovendo, idRemovendo, updateQuantidade } = useLocaisStore();
  const { usuario } = useUsuarioStore();
  let quantidade = 1;

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // const { mutate: alterarLocal, error: errorAlterarLocal } = useAlterarLocal();

  const location = useLocation();
  const navigate = useNavigate();
  const { handleShowToast } = useOutletContext<{ handleShowToast: (toastText: string) => void }>();

  // if (errorAlterarLocal) throw errorAlterarLocal;

  // const {
  //   mutate: removerLocal,
  //   // isPending: carregandoLocais,
  //   error: errorRemocaoLocal,
  // } = useRemoverLocal();

  const tratarRemocaoLocalCarrinho = (id: number) => {
    setIdRemovendo(id);
    setLocaisCarrinho(locaisCarrinho.filter(item => item.local.id !== id));
    setIdRemovendo(null);
  };

  const handleIncrease = (id: number) => {
    const item = locaisCarrinho.find(item => item.local.id === id);
    if (item) {
      updateQuantidade(id, item.quantidade + 1);
    }
  };

  const handleDecrease = (id: number) => {
    const item = locaisCarrinho.find(item => item.local.id === id);
    if (item && item.quantidade > 1) {
      updateQuantidade(id, item.quantidade - 1);
    } else if (item && item.quantidade === 1) {
      tratarRemocaoLocalCarrinho(id);
    }
  };

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", marginTop: "20px" }}>
      <h5>Carrinho</h5>
      <div className="table-responsive">
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th className="align-middle text-center"></th>
              <th className="align-middle text-center">Local</th>
              <th className="align-middle text-center">Valor diária</th>
              <th className="align-middle text-center">Quantidade</th>
              <th className="align-middle text-center">Valor total</th>
              <th className="align-middle text-center">Remover</th>
            </tr>
          </thead>
          <tbody>
          {locaisCarrinho.map(({ local, quantidade }) => (local &&(
              <tr key={local.id} className={''}>
                <td width={"13%"} className="align-middle text-center">
                  <img
                    src={local.imagem}
                    width="120px"
                    height="80px"
                    style={{ objectFit: "cover" }}
                    alt={local.categoria.nome}
                  />
                </td>
                <td width={"20%"} className="align-middle ps-3">
                  <a onClick={() => setLocalSelecionado(local)} className="link_underline">
                    {local.nome}
                  </a>
                </td>
                <td width={"8%"} className="align-middle text-end pe-3">
                  {local.valorDiaria.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
                </td>
                <td width={"8%"} className="align-middle text-center">
                  <button className="btn btn-secondary btn-sm" onClick={() => local.id && handleDecrease(local.id)}>-</button>
                  <span className="mx-2">{quantidade}</span>
                  <button className="btn btn-secondary btn-sm" onClick={() => local.id && handleIncrease(local.id)}>+</button>
                </td>
                <td width={"8%"} className="align-middle text-end pe-3">
                  {(local.valorDiaria * quantidade).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
                </td>
                <td width={"13%"} className="align-middle text-center">
                  <button
                    onClick={() => tratarRemocaoLocalCarrinho(local.id!)}
                    className="btn btn-danger btn-sm"
                    type="button"
                  >
                    {idRemovendo === local.id ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Removendo...
                      </>
                    ) : (
                      "Remover"
                    )}
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
        <button
          className="btn btn-primary btn-sm"
          type="button"
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default DateSelector;