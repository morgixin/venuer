import CadastroDeLocaisForm from "../components/CadastroDeProdutosForm"

const CadastroDeProdutosPage = () => {
  return (
    <>
      <div>Cadastro de novo local</div>
      <CadastroDeLocaisForm isEdit={false} isCreate={true}/>
    </>
  )
}

export default CadastroDeProdutosPage