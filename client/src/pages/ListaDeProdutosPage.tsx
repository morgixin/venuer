import CadastroDeProdutosForm from "../components/CadastroDeProdutosForm";
import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDeProdutos from "../components/TabelaDeProdutos";
import useUsuarioStore from "../store/useUsuarioStore";

const ListaDeProdutosPage = () => {
  const usuario = useUsuarioStore((s) => s.usuario);

  return (
    <>
      <h5>Lista de Locais</h5>
      <hr className="mt-1"/>
      <Pesquisa />
      <TabelaDeProdutos usuario={usuario}/>
      <Paginacao />
    </>
  )
}
export default ListaDeProdutosPage