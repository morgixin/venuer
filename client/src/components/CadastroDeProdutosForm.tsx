import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import databaseAdd from "../assets/skin/database_add.png";
import databaseEdit from "../assets/skin/database_edit.png";
import databaseCancel from "../assets/skin/multiply.png";
import useCadastrarLocal from "../hooks/useCadastrarLocal";
import Categoria from "../interfaces/Categoria";
import Local from "../interfaces/Local";
import { z } from "zod";
import dataValida from "../util/dataValida";
import { zodResolver } from "@hookform/resolvers/zod";
import useLocaisStore from "../store/useLocaisStore";
import dayjs from "dayjs";
import useAlterarLocal from "../hooks/useAlterarLocal";
// import useUsuario from "../hooks/useUsuario";
// import Usuario from "../interfaces/Usuario";
import Restricao from "../interfaces/Restricao";
import Inclusao from "../interfaces/Inclusao";
import Facilidade from "../interfaces/Facilidade";
import useUsuarioStore from "../store/useUsuarioStore";
import Reserva from "../interfaces/Reserva";
import {
  getFacilidades,
  getInclusoes,
  getRestricoes,
} from "../hooks/useOptions";
import { getCategorias } from "../hooks/useCategoria";

/**
 * DATA VALIDATION WITH ZOD
 */

//
// const categoriaValida = (categoria: string) => {
//   return categoria != "0";
// };

const regexImagem = /^[a-z]+\.(gif|jpg|png|bmp)$/;
const schema = z.object({
  nome: z
    .string()
    .min(1, { message: "O nome deve ser informado." })
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
  descricao: z.string().min(1, { message: "A descrição deve ser informada." }),
  // categoria: z.object({
  //   id: z.number().positive("A categoria selecionada deve ser válida."),
  //   nome: z.string(),
  // }),
  // dataCadastro: z
  //   .string()
  //   .min(1, { message: "A data de cadastro deve ser informada." })
  //   .refine(dataValida, { message: "Data inválida." }),
  valorDiaria: z
    .number({ invalid_type_error: "O preço deve ser informado." })
    .min(0.1, { message: "O preço deve ser maior ou igual a R$ 0.10" }),
  qtdMinimaPessoas: z
    .number({
      invalid_type_error: "A quantidade mínima de pessoas deve ser informada.",
    })
    .min(0, {
      message: "A quantidade mínima de pessoas deve ser maior do que zero.",
    }),
  qtdMaximaPessoas: z
    .number({
      invalid_type_error: "A quantidade máxima de pessoas deve ser informada.",
    })
    .min(0, {
      message: "A quantidade máxima de pessoas deve ser maior do que zero.",
    }),
  imagem: z
    .string()
    .min(1, { message: "A imagem deve ser informada." })
    .regex(regexImagem, { message: "Nome de imagem inválido." }),
  disponivel: z.boolean(),
  endereco: z.string().min(1, { message: "O endereço deve ser informado." }),
  cidade: z.string().min(1, { message: "A cidade deve ser informada." }),
  estado: z.string().min(1, { message: "O estado deve ser informado." }),
  cep: z.string().min(1, { message: "O CEP deve ser informado." }),
  restricoes: z.array(z.object({
    id: z.number(),
    tag: z.string(),
  })).optional(),
  inclusoes: z.array(z.object({
    id: z.number(),
    tag: z.string(),
  })).optional(),
  facilidades: z.array(z.object({
    id: z.number(),
    tag: z.string(),
  })).optional(),
  // usuario: z.object({
  //   id: z.number(),
  //   username: z.string(),
  //   name: z.string(),
  //   surname: z.string(),
  //   email: z.string(),
  //   phoneNumber: z.string(),
  //   password: z.string(),
  // }),
  // reservas: z.array(z.object({
  //   id: z.number(),
  //   dataInicio: z.string(),
  // })).optional(),
});

type LocalForm = z.infer<typeof schema>;

interface Props {
  isEdit: boolean;
  isCreate: boolean;
}

const CadastroDeLocaisForm = (props: Props) => {
  const localSelecionado = useLocaisStore((s) => s.localSelecionado);
  const setLocalSelecionado = useLocaisStore((s) => s.setLocalSelecionado);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<LocalForm>({ resolver: zodResolver(schema) });

  const { mutate: cadastrarLocal, error: errorCadastrarLocal } = useCadastrarLocal();
  const { mutate: alterarLocal, error: errorAlterarLocal } = useAlterarLocal();

  // const onSubmit = data => console.log(data);

  const usuario = useUsuarioStore((s) => s.usuario);
  console.log(usuario);
  console.log("is edit:", props.isEdit)

  // load localSelecionado from Local list when user clicks on name value --> used on Edit mode
  useEffect(() => {
    console.log("localSelecionado executado");
    setFocus("nome");
    reset();
    if (localSelecionado.id) {
      setValue("nome", localSelecionado.nome);
      setValue("descricao", localSelecionado.descricao);
      // setValue("categoria", localSelecionado.categoria);
      // setValue(
      //   "dataCadastro",
      //   dayjs(localSelecionado.dataCadastro).format("DD/MM/YYYY")
      // );
      setValue("valorDiaria", localSelecionado.valorDiaria);
      setValue(
        "qtdMinimaPessoas",
        localSelecionado.qtdMinimaPessoas
          ? localSelecionado.qtdMinimaPessoas
          : 0
      );
      setValue(
        "qtdMaximaPessoas",
        localSelecionado.qtdMaximaPessoas
          ? localSelecionado.qtdMaximaPessoas
          : 0
      );
      setValue("imagem", localSelecionado.imagem);
      setFacilidades(localSelecionado.facilidades || []);
      setInclusoes(localSelecionado.inclusoes || []);
      setRestricoes(localSelecionado.restricoes || []);
      // setValue(
      //   "reservas",
      //   localSelecionado.reservas?.map((r) => r?.id?.toString() || "") || []
      // );
      setValue("disponivel", localSelecionado.disponivel);
      setValue("endereco", localSelecionado.endereco);
      setValue("cidade", localSelecionado.cidade);
      setValue("estado", localSelecionado.estado);
      setValue("cep", localSelecionado.cep);
    }
  }, [localSelecionado]);


  if (errorCadastrarLocal) throw errorCadastrarLocal;
  if (errorAlterarLocal) throw errorAlterarLocal;


  /**
   * Load options for categorias, restricoes, inclusoes, and facilidades
  */
  const [categoriasOptions, setCategoriasOptions] = useState<Categoria[]>([]);
  const [restricoesOptions, setRestricoesOptions] = useState<Restricao[]>([]);
  const [inclusoesOptions, setInclusoesOptions] = useState<Inclusao[]>([]);
  const [facilidadesOptions, setFacilidadesOptions] = useState<Facilidade[]>([]);

  useEffect(() => {
    // Load options for restricoes, inclusoes, and facilidades
    const loadOptions = async () => {
      const categoriasData = await fetchCategorias();
      const restricoesData = await fetchRestricoes();
      const inclusoesData = await fetchInclusoes();
      const facilidadesData = await fetchFacilidades();
      // Set options for restricoes, inclusoes, and facilidades
      setCategoriasOptions(categoriasData);
      setRestricoesOptions(restricoesData);
      setInclusoesOptions(inclusoesData);
      setFacilidadesOptions(facilidadesData);
      // console.log("era pra ter setado hein! "+restricoesData);
    };
    loadOptions();
  }, []);

  // fetch from API all values from each table
  const fetchCategorias = async (): Promise<Categoria[]> => {
    return await getCategorias();
  }
  const fetchRestricoes = async (): Promise<Restricao[]> => {
    return await getRestricoes();
  };
  const fetchInclusoes = async (): Promise<Inclusao[]> => {
    return await getInclusoes();
  };
  const fetchFacilidades = async (): Promise<Facilidade[]> => {
    return await getFacilidades();
  };

  // State for selected values in Select components
  const [restricoes, setRestricoes] = useState<Restricao[]>([]);
  const [currentRestricao, setCurrentRestricao] = useState<string>("");
  const [inclusoes, setInclusoes] = useState<Inclusao[]>([]);
  const [currentInclusao, setCurrentInclusao] = useState<string>("");
  const [facilidades, setFacilidades] = useState<Facilidade[]>([]);
  const [currentFacilidade, setCurrentFacilidade] = useState<string>("");
  const [reserva, setReserva] = useState<Reserva[]>([]); // consertar?
  const [categoriaOpt, setCategoria] = useState<Categoria>(); // salva opção selecionada de categoria

  // handle select multiple options, saving as badge format in UI
  const handleAddRestricao = () => {
    if (currentRestricao.trim() !== "") {
      const selectedOption = restricoesOptions.find(
        (option) => option.tag === currentRestricao
      );
      if (selectedOption) {
        setRestricoes([...restricoes, selectedOption]);
        setRestricoesOptions(restricoesOptions.filter((option) => option.tag !== currentRestricao));
        setCurrentRestricao("");
      }
    }
  };
  const handleAddInclusao = () => {
    if (currentInclusao.trim() !== "") {
      const selectedOption = inclusoesOptions.find(
        (option) => option.tag === currentInclusao
      );
      if (selectedOption) {
        setInclusoes([...inclusoes, selectedOption]);
        setInclusoesOptions(inclusoesOptions.filter((option) => option.tag !== currentInclusao));
        setCurrentInclusao("");
      }
    }
  };
  const handleAddFacilidade = () => {
    if (currentFacilidade.trim() !== "") {
      const selectedOption = facilidadesOptions.find(
        (option) => option.tag === currentFacilidade
      );
      if (selectedOption) {
        setFacilidades([...facilidades, selectedOption]);
        setFacilidadesOptions(facilidadesOptions.filter((option) => option.tag !== currentFacilidade));
        setCurrentFacilidade("");
      }
    }
  };

  const handleRemoveRestricao = (index: number) => {
    setRestricoes(restricoes.filter((_, i) => i !== index));
  };
  
  const handleRemoveInclusao = (index: number) => {
    setInclusoes(inclusoes.filter((_, i) => i !== index));
  };
  
  const handleRemoveFacilidade = (index: number) => {
    setFacilidades(facilidades.filter((_, i) => i !== index));
  };

  // submit object of format LocalForm to API
  const submit = (data: LocalForm) => {
    console.log("1231")
    if (!usuario) {
      console.log("usuario não encontrado");
      return;
    }
    console.log("chegyei aqui")
  // let local: Local = {} as Local;

    
  let local: Local = {
    id: props.isEdit ? localSelecionado.id : null,
    nome: data.nome,
    descricao: data.descricao,
    categoria: categoriaOpt || {id: 108, nome: "Espaço"},
    dataCadastro: props.isEdit  ? localSelecionado.dataCadastro : new Date().toISOString().split("T")[0],
    valorDiaria: data.valorDiaria,
    qtdMinimaPessoas: data.qtdMinimaPessoas,
    qtdMaximaPessoas: data.qtdMaximaPessoas,
    imagem: data.imagem,
    disponivel: data.disponivel,
    endereco: data.endereco,
    cidade: data.cidade,
    estado: data.estado,
    cep: data.cep,
    restricoes: restricoes || [],
    inclusoes: inclusoes || [],
    facilidades: facilidades || [],
    reservas: reserva || [],
    usuario: {
      id: usuario.id,
      username: usuario.username,
      name: usuario.name,
      surname: usuario.surname,
      email: usuario.email,
      phoneNumber: usuario.phoneNumber,
      password: usuario.password,
    },
  };

    console.log("local: ", local, "restrições: ", restricoes, "inclusões: ", inclusoes, "facilidades: ", facilidades);
    // cadastrarLocal(local);

    if (props.isEdit) {
      // if (localSelecionado.id) {
      //   local.id = localSelecionado.id;
      alterarLocal(local);
      // }
    }
    if (props.isCreate) {
      console.log("cadastrando local: ", local)
      cadastrarLocal(local);
    }
  };

  /**
   * RESET FORM
   */

  // reset form when submit is successful
  useEffect(() => {
    console.log("isSubmitSuccessful executado");
    setFocus("nome");
    if (isSubmitSuccessful) {
      reset();
      setRestricoes([]);
      setInclusoes([]);
      setFacilidades([]);
      setLocalSelecionado({} as Local);
    }    
  }, [isSubmitSuccessful]);

  // reset form when user clicks on Cancel button
  useEffect(() => {
    console.log("[] executado");
    return () => {
      setLocalSelecionado({} as Local);
    };
  }, []);


  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="row">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="nome" className="col-xl-2 fw-bold">
              Nome
            </label>
            <div className="col-xl-10">
              <input
                {...register("nome")}
                type="text"
                id="nome"
                className={
                  errors.nome
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.nome?.message}</div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="descricao" className="col-xl-3 fw-bold">
              Descrição
            </label>
            <div className="col-xl-9">
              <input
                {...register("descricao")}
                type="text"
                id="descricao"
                className={
                  errors.descricao
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">
                {errors.descricao?.message}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="categoria" className="col-xl-2 fw-bold">
              Categoria
            </label>
            <div className="col-xl-10">
              <select
                // {...register("categoria")}
                id="categoria"
                className={
                  // errors.categoria
                  //   ? "form-control form-control-sm is-invalid"
                    //   : 
                    "form-control form-control-sm"
                  }
                  defaultValue={localSelecionado.categoria?.nome}
                  onChange={(e) => {
                    const selectedCategoria = categoriasOptions.find(option => option.nome === e.target.value) || { id: 4, nome: "Espaço" };
                    setCategoria(selectedCategoria);
                  }}
                  >
                <option value="0">Selecione uma categoria</option>
                {categoriasOptions.map((option) => (
                  <option key={option.id} value={option.nome}>
                    {option.nome}
                  </option>
                ))}
              </select>
              {/* <div className="invalid-feedback">
                {errors.categoria?.message}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="valorDiaria" className="col-xl-2 fw-bold">
              Valor Diária
            </label>
            <div className="col-xl-10">
              <input
                {...register("valorDiaria", { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0"
                id="valorDiaria"
                className={
                  errors.valorDiaria
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">
                {errors.valorDiaria?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="qtdMinimaPessoas" className="col-xl-3 fw-bold">
              Quantidade Mínima de Pessoas
            </label>
            <div className="col-xl-9">
              <input
                {...register("qtdMinimaPessoas", { valueAsNumber: true })}
                type="number"
                min="0"
                id="qtdMinimaPessoas"
                className={
                  errors.qtdMinimaPessoas
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">
                {errors.qtdMinimaPessoas?.message}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="qtdMaximaPessoas" className="col-xl-2 fw-bold">
              Quantidade Máxima de Pessoas
            </label>
            <div className="col-xl-10">
              <input
                {...register("qtdMaximaPessoas", { valueAsNumber: true })}
                type="number"
                min="0"
                id="qtdMaximaPessoas"
                className={
                  errors.qtdMaximaPessoas
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">
                {errors.qtdMaximaPessoas?.message}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="imagem" className="col-xl-2 fw-bold">
              Imagem
            </label>
            <div className="col-xl-10">
              <input
                {...register("imagem")}
                type="text"
                id="imagem"
                className={
                  errors.imagem
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.imagem?.message}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="endereco" className="col-xl-2 fw-bold">
              Endereço
            </label>
            <div className="col-xl-10">
              <input
                {...register("endereco")}
                type="text"
                id="endereco"
                className={
                  errors.endereco
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.endereco?.message}</div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="cidade" className="col-xl-2 fw-bold">
              Cidade
            </label>
            <div className="col-xl-10">
              <input
                {...register("cidade")}
                type="text"
                id="cidade"
                className={
                  errors.cidade
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.cidade?.message}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="estado" className="col-xl-2 fw-bold">
              Estado
            </label>
            <div className="col-xl-10">
              <input
                {...register("estado")}
                type="text"
                id="estado"
                className={
                  errors.estado
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.estado?.message}</div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="cep" className="col-xl-2 fw-bold">
              CEP
            </label>
            <div className="col-xl-10">
              <input
                {...register("cep")}
                type="text"
                id="cep"
                className={
                  errors.cep
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.cep?.message}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="restricoesSelect" className="col-xl-2 fw-bold">
              Restrições
            </label>
            <div className="col-xl-10">
              <select
                id="restricoesSelect"
                value={currentRestricao}
                onChange={(e) => setCurrentRestricao(e.target.value)}
                onClick={handleAddRestricao}
                className="form-control form-control-sm"
              >
                <option key={0} value="">Selecione uma restrição</option>
                {restricoesOptions.map((option) => (
                  <option key={option.id} value={option.tag}>
                    {option.tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-xl-10 offset-xl-2">
              {restricoes.map((restricao, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  {restricao.tag}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    aria-label="Close"
                    onClick={() => handleRemoveRestricao(index)}
                  ></button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="inclusoesSelect" className="col-xl-2 fw-bold">
              Inclusões
            </label>
            <div className="col-xl-10">
              <select
                id="inclusoesSelect"
                value={currentInclusao}
                onChange={(e) => setCurrentInclusao(e.target.value)}
                onClick={handleAddInclusao}
                className="form-control form-control-sm"
              >
                <option value="">Selecione uma inclusão</option>
                {inclusoesOptions.map((option) => (
                  <option key={option.id} value={option.tag}>
                    {option.tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-xl-10 offset-xl-2">
              {inclusoes.map((inclusao, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  {inclusao.tag}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    aria-label="Close"
                    onClick={() => handleRemoveInclusao(index)}
                  ></button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <label htmlFor="facilidadesSelect" className="col-xl-2 fw-bold">
              Facilidades
            </label>
            <div className="col-xl-10">
              <select
                id="facilidadesSelect"
                value={currentFacilidade}
                onChange={(e) => setCurrentFacilidade(e.target.value)}
                onClick={handleAddFacilidade}
                className="form-control form-control-sm"
              >
                <option value="">Selecione uma facilidade</option>
                {facilidadesOptions.map((option) => (
                  <option key={option.id} value={option.tag}>
                    {option.tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-xl-10 offset-xl-2">
              {facilidades.map((facilidade, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  {facilidade.tag}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    aria-label="Close"
                    onClick={() => handleRemoveFacilidade(index)}
                  ></button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col-xl-6">
          <div className="row mb-2">
            <div className="form-check pl-0 mt-xl-0 mt-2">
              <input
                {...register("disponivel")}
                type="checkbox"
                id="disponivel"
                className="form-check-input"
              />
              <label htmlFor="disponivel" className="form-check-label">
                Disponível?
              </label>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-10 offset-xl-2 d-flex flex-row">
              <button
                id="botao"
                type="submit"
                style={{ width: "100px" }}
                // onClick={() => console.log("clicou carlahon")}
                className="btn btn-primary btn-sm d-flex align-items-center me-3"
              >
                {props.isEdit ? (
                  <>
                    <img src={databaseEdit} className="me-1" /> Alterar
                  </>
                ) : null}
                {props.isCreate ? (
                  <>
                    <img src={databaseAdd} className="me-1" /> Cadastrar
                  </>
                ) : null}
              </button>
              <button
                id="botao"
                type="button"
                onClick={() => setLocalSelecionado({} as Local)}
                className="btn btn-primary btn-sm d-flex align-items-center "
              >
                <img src={databaseCancel} className="me-1" /> Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default CadastroDeLocaisForm;
