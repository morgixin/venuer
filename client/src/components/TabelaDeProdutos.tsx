import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useLocaisComPaginacao from "../hooks/useLocaisComPaginacao";
import useLocalsStore from "../store/useLocaisStore";

import Usuario from "../interfaces/Usuario";
import Ordenacao from "./Ordenacao";

interface Props {
  usuario: Usuario | null;
}

const TabelaDeLocais = ({ usuario }: Props) => {
  const pagina = useLocalsStore((s) => s.pagina);
  const tamanho = useLocalsStore((s) => s.tamanho);
  const nome = useLocalsStore((s) => s.nome);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(usuario);
  }, [usuario]);

  const setPagina = useLocalsStore((s) => s.setPagina);
  const setlocalSelecionado = useLocalsStore((s) => s.setLocalSelecionado);

  const [sortField, setSortField] = useState<string>("id");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const {
    data: resultadoPaginado,
    isPending: carregandoLocais,
    error: errorlocals,
    refetch,
  } = useLocaisComPaginacao({ pagina, tamanho, nome, sortField, sortOrder });

  useEffect(() => {
    refetch();
    console.log
  }, [sortField, sortOrder, refetch]);

  useEffect(() => {
    console.log("Dados atualizados:", resultadoPaginado);
  }, [resultadoPaginado]);

  if (carregandoLocais) return <h6>Carregando...</h6>;
  if (errorlocals) throw errorlocals;

  const locais = resultadoPaginado.itens;

  const localSelecionado = (local: any) => {
    setlocalSelecionado(local);
    navigate("/locais/" + local.id);
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th className="align-middle text-center">Disponibilidade 
              <Ordenacao
                sortField="none"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              /></th>
            <th className="align-middle text-center">Imagem 
              <Ordenacao
                sortField="none"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              /></th>
            <th className="align-middle text-center">Categoria 
              <Ordenacao
                sortField="none"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              /></th>
            <th className="align-middle text-center">
              Nome{" "}
              <Ordenacao
                sortField="nome"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </th>
            <th className="align-middle text-center">Endereço
              <Ordenacao
                sortField="none"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              /></th>
            <th className="align-middle text-center">Cidade
              <Ordenacao
                sortField="none"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              /></th>
            <th className="align-middle text-center">Valor diária
              <Ordenacao
                sortField="none"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              /></th>
            <th className="align-middle text-center">
              Adicionado em{" "}
              <Ordenacao
                sortField="dataCadastro"
                currentSortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {locais.map((local) => (
            <tr key={local.id} className={local.disponivel == false ? 'table-secondary' : ''}>
              <td width={"7%"} className="align-middle text-center">
                {local.disponivel ? "Disponível" : "Indisponível"}
              </td>
              <td width={"13%"} className="align-middle text-center">
                <img
                  src={local.imagem}
                  width="120px"
                  height="80px"
                  style={{ objectFit: "cover" }}
                  alt={local.categoria.nome}
                />
              </td>
              <td width={"13%"} className="align-middle text-center">
                {local.categoria.nome}
              </td>
              <td width={"20%"} className="align-middle ps-3">
                <a onClick={() => localSelecionado(local)} className="link_underline">
                  {local.nome}
                </a>
              </td>
              <td width={"15%"} className="align-middle text-center">
                {local.endereco}
              </td>
              <td width={"13%"} className="align-middle text-center">
                {local.cidade + ", " + local.estado}
              </td>
              <td width={"8%"} className="align-middle text-end pe-3">
                {local.valorDiaria.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
              </td>
              <td width={"11%"} className="align-middle text-end pe-3">
                {dayjs(local.dataCadastro).format("DD/MM/YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaDeLocais;