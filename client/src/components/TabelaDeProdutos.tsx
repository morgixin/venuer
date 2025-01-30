import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useLocaisComPaginacao from "../hooks/useLocaisComPaginacao";
import useLocalsStore from "../store/useLocaisStore";

import Usuario from "../interfaces/Usuario";
import Ordenacao from "./Ordenacao";
import useUsuarioStore from "../store/useUsuarioStore";
import useRemoverLocal from "../hooks/useRemoverLocal";

interface Props {
  usuario: Usuario | null;
  filterByUser: boolean;
}

const TabelaDeLocais = ({ usuario, filterByUser }: Props) => {
  const pagina = useLocalsStore((s) => s.pagina);
  const tamanho = useLocalsStore((s) => s.tamanho);
  const nome = useLocalsStore((s) => s.nome);
  const idRemovendo = useLocalsStore((s) => s.idRemovendo);
  let usuarioId = 0;
  if (filterByUser && usuario != null)
    usuarioId = useUsuarioStore((s) => s.usuario.id);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(usuario);
  }, [usuario]);

  const setPagina = useLocalsStore((s) => s.setPagina);
  const setlocalSelecionado = useLocalsStore((s) => s.setLocalSelecionado);
  const setIdRemovendo = useLocalsStore((s) => s.setIdRemovendo);


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
    mutate: removerLocal,
    // isPending: carregandoLocais,
    error: errorRemocaoLocal,
  } = useRemoverLocal();

  const tratarRemocaoLocal = (id: number) => {
    setIdRemovendo(id);
    removerLocal(id, {
      onSuccess: () => {
        setIdRemovendo(null); // Reseta estado após sucesso
        setPagina(0);
      },
      onError: () => {
        setIdRemovendo(null); // Reseta estado mesmo em caso de erro
      },
    });
    setPagina(0);
  };

  const {
    data: resultadoPaginado,
    isPending: carregandoLocais,
    error: errorlocals,
    refetch,
  } = useLocaisComPaginacao({ pagina, tamanho, nome, usuarioId, sortField, sortOrder });

  useEffect(() => {
    refetch();
  }, [sortField, sortOrder, refetch]);

  useEffect(() => {
    console.log("Dados atualizados:", resultadoPaginado);
  }, [resultadoPaginado]);

  if (carregandoLocais) return <h6>Carregando...</h6>;
  if (errorlocals) throw errorlocals;

  const locais = resultadoPaginado.itens;

  // const filterDataByUserId = () => {
      // locais.filter((local) => local.usuario.id === usuario?.id)
  // }

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
            {filterByUser && <th className="align-middle text-center">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {locais
            .map((local) => (
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
              <td width={"15%"} className="align-middle text-center">
                {dayjs(local.dataCadastro).format("DD/MM/YYYY")}
              </td>
              {filterByUser && (
                <td width={"13%"} className="align-middle text-center">
                  <button
                    onClick={() => tratarRemocaoLocal(local.id!)}
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
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaDeLocais;