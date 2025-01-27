import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import useProdutosPaginadosPeloNomeDaCategoria from "../hooks/useLocaisPaginadosPeloNomeDaCategoria";

const primeiraLetraMaiuscula = (palavra: string) => {
  return palavra.charAt(0).toUpperCase() + palavra.slice(1);
};
const CardsDeLocaisPage = () => {
  const tamanho = 12;
  const { nomeCategoria } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isPending: carregandoProdutos,
    error: errorProdutos,
    hasNextPage,
    fetchNextPage,
  } = useProdutosPaginadosPeloNomeDaCategoria({ tamanho, nomeCategoria });

  if (carregandoProdutos) return <h6>Carregando...</h6>;
  if (errorProdutos) throw errorProdutos;

  return (
    <InfiniteScroll 
      style={{height: "", overflow: ""}}
      className="row"
      dataLength={data.pages.reduce((total, page) => total + page.totalDeItens, 0)}
      hasMore={hasNextPage}
      loader={<h6>Carregando...</h6>}
      next={() => fetchNextPage()}>
      {/* <h5>
        Espaços do tipo {nomeCategoria ? primeiraLetraMaiuscula(nomeCategoria) : "Produtos"}
      </h5> */}
      <div className="row">
        {data.pages.map((page) =>
          page.itens.map((produto) => (
            <div key={produto.id} className="col-xl-4 col-md-3 col-sm-4 col-6">
              <Card
                imagem={produto.imagem}
                titulo={produto.nome}
                descricao={produto.descricao}
                preco={produto.valorDiaria.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
                categoria={produto.categoria.nome}
                footer={
                  <input
                    type="button"
                    className="btn btn-primary btn-sm w-100"
                    value="Ver detalhes"
                    onClick={() => {navigate(`/locais/${produto.id}`)}}
                  />
                }
              />
            </div>
          ))
        )}
      </div>
    </InfiniteScroll>
  );
};
export default CardsDeLocaisPage;
