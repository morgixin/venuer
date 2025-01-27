import CadastroDeLocaisForm from "../components/CadastroDeProdutosForm"

const EditarLocalPage = () => {
  return (
    <>
      <div>Editar</div>
      <CadastroDeLocaisForm isEdit={true} isCreate={false}/>
    </>
  )
}

export default EditarLocalPage