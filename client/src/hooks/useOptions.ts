import { URL_FACILIDADES, URL_INCLUSOES, URL_RESTRICOES } from "../util/constants";
import useAPI from "./useAPI";
import Facilidade from "../interfaces/Facilidade";
import Inclusao from "../interfaces/Inclusao";
import Restricao from "../interfaces/Restricao";

// const useOptions = () => {
  export const getFacilidades = async () => {
    const { recuperar } = useAPI<Facilidade>(`${URL_FACILIDADES}`);
    const response = await recuperar();
    return response;
  };

  export const getInclusoes = async () => {
    const { recuperar } = useAPI<Inclusao>(`${URL_INCLUSOES}`);
    const response = await recuperar();
    return response;
  };

  export const getRestricoes = async () => {
    const { recuperar } = useAPI<Restricao>(`${URL_RESTRICOES}`);
    const response = await recuperar();
    return response
};

  // return { getFacilidades, getInclusoes, getRestricoes };
// };

// export default useOptions;