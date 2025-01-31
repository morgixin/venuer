// filepath: /c:/Users/anabs/Downloads/projeto23-PrivateRoutes-completo/projeto23-PrivateRoutes-completo/src/pages/DetalhesLocal.tsx
import Local from "../interfaces/Local";
import useUsuarioStore from "../store/useUsuarioStore";
import useParamsLocais from "../hooks/useParamsLocais";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext, useLocation } from "react-router-dom";
import useLocalsStore from "../store/useLocaisStore";
import useReservaStore from "../store/useReservaStore";
import useRemoverlocal from "../hooks/useRemoverLocal";

const DetalhesLocal = () => {
  const { idLocal } = useParams<{ idLocal: string }>();
  const usuario = useUsuarioStore((s) => s.usuario);
  const [local, setLocal] = useState<Local | null>(null);

  const { data, isLoading, error } = useParamsLocais(Number(idLocal));

  // obtem o local selecionado anteriormente para dispor na tela
  const setlocalSelecionado = useLocalsStore((s) => s.setLocalSelecionado);
  // const setReservas = useReservaStore((s) => s.setReservas);
  const {setLocaisCarrinho, locaisCarrinho} = useLocalsStore();

  // redirecionar quando deletar
  const location = useLocation();
  const navigate = useNavigate();

  // ativar o toast se deletar
  const { handleShowToast } = useOutletContext<{ handleShowToast: (toastText: string) => void }>();

  useEffect(() => {
    if (data) {
      setLocal(data);
    }
  }, [data]);

  const editElement = () => {
    if (!local) return;
    setlocalSelecionado(local);
    navigate("/editar-local");
  };

  const {
    mutate: removerlocal,
    // isPending: removendolocal,
    error: errorRemocaolocal,
  } = useRemoverlocal();

  const tratarRemocaoDelocal = (id: number) => {
    removerlocal(id, {
      onSuccess: () => {
        handleShowToast("Local deletado com sucesso!");
        setTimeout(() => {
          if (location.state && location.state.from) {
            navigate(location.state.from);
          } else {
            navigate("/listar-locais");
          }
        }, 1000);
      },
    });
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading local</div>;
  if (!local) return <div>No local data available</div>;

  return (
    <div>
      <img
        src={`/${local.imagem}`}
        width="100%"
        height="100%"
        // height="1000vh"
        style={{ objectFit: "cover", position: "fixed", zIndex: -3, top: "1px", left: 0, right: 0, bottom:0 }}
        alt={local.categoria.nome}
      />
      <div className="container bg-light" style={{ marginTop: "400px", padding: "20px", borderRadius: "6px" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" , marginBottom: 0}}>
              {/* <p style={{marginBottom: 0, color: "gray", fontSize: 18, padding:0}}>{local.categoria.nome}</p> */}
              <h2 style={{ marginTop:0, marginBottom: 10, paddingTop:0 }}>{local.nome}</h2>
            </div>
            {usuario !== null ?
              (usuario.id === local.usuario.id) ? (
                <div style={{display: "flex", gap: "24px"}}>
                  <button
                    type="button"
                    onClick={editElement}
                    className="btn btn-outline-secondary"
                    style={{ right: 0 }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      tratarRemocaoDelocal(local.id!);
                    }}
                    className="btn btn-outline-danger"
                    style={{ right: 0 }}
                  >
                    Deletar
                  </button>
                </div>)
                :
                local.disponivel ?
                  <div className="card border-0 shadow-sm" style={{ width: "12rem", position: "absolute", right: "140px" }}>
                    <div className="card-body">
                      <p className="card-text">A partir de</p>
                      <h5 className="card-title">
                        R$ {local.valorDiaria.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                          useGrouping: true,
                        })}/dia
                      </h5>
                      {local.valorPessoa && local.valorPessoa !== 0 && (
                        <p className="card-text mb-1" style={{ color: "gray"}}>
                          R$ {local.valorPessoa.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                          })}/pessoa
                        </p>
                      )}
                      {local.valorHora && local.valorHora !== 0 && (
                        <p className="card-text mb-2" style={{ color: "gray"}}>
                          R$ {local.valorHora.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                          })}/hora
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (local.reservas) {
                            setLocaisCarrinho(locaisCarrinho.concat({ local, quantidade: 1 }));
                            // console.log(local.reservas);
                            navigate("/carrinho");
                          }
                        }}
                        className="btn btn-warning btn-lg mt-2"
                        style={{ width: "100%", }}
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                  : <h3><span className="badge bg-secondary">Indisponível</span></h3>
              : (
                <></>
              )}
          </div>
          <div>
            
          </div>
          <p style={{fontSize:18}}>{local.descricao}</p>
          <p style={{color: "gray", marginBottom: 20}}>
            {local.cidade} - {local.estado}
          </p>

          {local.qtdMaximaPessoas ? (
            <p>Quantidade máxima de pessoas: <span style={{fontWeight:"bold"}}>{local.qtdMaximaPessoas}</span></p>
          ) : null}
          {(local.qtdMinimaPessoas && local.qtdMinimaPessoas > 0) ? (
            <p>Quantidade mínima de pessoas:<span style={{fontWeight:"bold"}}>{local.qtdMinimaPessoas}</span></p>
          ) : null}
          {(local.qtdAndares && local.qtdAndares > 0) ? (
            <p>Quantidade de andares: <span style={{fontWeight:"bold"}}>{local.qtdAndares}</span></p>
          ) : null}
          {local.qtdBanheiros && (local.qtdBanheiros > 0) ? (
            <p>Quantidade de banheiros: <span style={{fontWeight:"bold"}}>{local.qtdBanheiros}</span></p>
          ): null}


          {local.facilidades && local.facilidades.length > 0 && (
            <div className="mt-5">
              <h5>Facilidades</h5>
              <hr className="mt-1" />
              {local.facilidades.map((f) => (
                <span key={f.tag} className="badge bg-primary me-1">
                  {f.tag}
                </span>
              ))}
            </div>
          )}
          {local.inclusoes && local.inclusoes.length > 0 && (
            <div className="mt-3 gap-2">
              <h5>Inclusões</h5>
              <hr className="mt-1" />
              {local.inclusoes.map((i) => (
                <span key={i.tag} className="badge bg-info me-1">
                  {i.tag}
                </span>
              ))}
            </div>
          )}
          {local.restricoes && local.restricoes.length > 0 && (
            <div className="mt-3 mb-5">
              <h5>Restrições</h5>
              <hr className="mt-1" />
              {local.restricoes.map((r) => (
                <span key={r.tag} className="badge bg-secondary me-1">
                  {r.tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhesLocal;