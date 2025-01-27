import axios, { AxiosRequestConfig } from "axios";
import { URL_BASE, URL_LOCAIS } from "../util/constants";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";
import Local from "../interfaces/Local";

const useAPILocal = () => {
  const axiosInstance = axios.create({
    baseURL: URL_BASE,
  });

  const recuperarLocaisPorNomeDaCategoria = (nome?: string) =>
    axiosInstance
      .get<Local[]>(URL_LOCAIS + (nome ? "/categoria/" + nome : ""))
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

  const recuperarLocaisPaginadosPeloNomeDaCategoria = (config: AxiosRequestConfig) =>
    axiosInstance
      .get<ResultadoPaginado<Local>>(URL_LOCAIS + "/categoria/paginacao", config)
      .then((res) => res.data)
      .catch((error) => {
        tratarErro(error);
        throw error;
      });

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

  return { recuperarLocaisPorNomeDaCategoria, recuperarLocaisPaginadosPeloNomeDaCategoria };
};
export default useAPILocal;
