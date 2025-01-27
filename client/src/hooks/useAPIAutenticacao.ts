import axios from "axios";
import { URL_AUTENTICACAO, URL_BASE } from "../util/constants";
// import TokenResponse from "../interfaces/TokenResponse";
// import UsuarioLogado from "../interfaces/UsuarioLogado";
import Usuario from "../interfaces/Usuario";

const useAPIAutenticacao = () => {
  const axiosInstance = axios.create({
    baseURL: URL_BASE,
  });

  // Envia um Usuario com conta e senha e recebe de volta um Token
  const login = (usuario: { email: string; password: string }) =>
    axiosInstance
      .post<Usuario>(`${URL_AUTENTICACAO}/login`, {
        email: usuario.email,
        password: usuario.password,
      })
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

  const signin = (usuario: Usuario) => 
    axiosInstance
      .post<Usuario>(`/signup`, {
        email: usuario.email,
        password: usuario.password,
        username: usuario.username,
        name: usuario.name,
        surname: usuario.surname,
        phoneNumber: usuario.phoneNumber,
      })
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

  // corrigir pra onde ele vai
  // const logout = () =>
  //   axiosInstance
  //     .post(URL_AUTENTICACAO + "/logout")
  //     .then((res) => res.data)
  //     .catch((error) => {
  //       tratarErro(error);
  //       throw error;
  //     });

  const tratarErro = (error: any) => {
    console.log("Erro: ", error);

    if (error.response) {
      console.log(
        "A requisição foi realizada e o servidor respondeu com as seguintes informações: "
      );
      console.log("Mensagem do servidor: ", error.response.data);
      console.log("Código de status: ", error.response.status);
    } else if (error.request && error.config) {
      console.log(
        "A requisição foi realizada mas nenhuma resposta foi recebida."
      );
      console.log("URL Base: ", error.config.baseURL);
      console.log("Método de envio: ", error.config.method);
      console.log("URL solicitado: ", error.config.url);
    } else {
      console.log(
        "Algo aconteceu durante a configuração do pedido que acionou um erro: ",
        error.message
      );
    }
  };

  return { login, signin };
};
export default useAPIAutenticacao;
