import { URL_CATEGORIA } from "../util/constants";
import useAPI from "./useAPI";
import Categoria from "../interfaces/Categoria";

// const useOptions = () => {
  export const getCategorias = async () => {
    const { recuperar } = useAPI<Categoria>(`${URL_CATEGORIA}`);
    const response = await recuperar();
    return response;
  };