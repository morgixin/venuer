import { useQuery } from "@tanstack/react-query";
import { URL_USUARIO } from "../util/constants";
import useAPI from "./useAPI";
import Usuario from "../interfaces/Usuario";

const useUsuario = () => {
  const getUsuarioById = (idUsuario: number) => {
    const { recuperar } = useAPI<Usuario>(`${URL_USUARIO}/${idUsuario}`);
    return useQuery({
      queryKey: ["id", idUsuario],
      queryFn: () => recuperar(),
      staleTime: 10_000,
    });
  };

  const getUsuarioByEmail = async (email: string) => {
    const { recuperar } = useAPI<Usuario>(`${URL_USUARIO}/email/${email}`);
    const response = await recuperar();
    return response;
  };

  return { getUsuarioById, getUsuarioByEmail };
};

export default useUsuario;