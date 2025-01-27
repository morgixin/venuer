import { useMutation } from "@tanstack/react-query";
import useAPIAutenticacao from "./useAPIAutenticacao";
import Usuario from "../interfaces/Usuario";

const useEfetuarCadastro = () => {
  const { signin } = useAPIAutenticacao();

  return useMutation({
    mutationFn: (usuario: Usuario) => signin(usuario),
  });
};

export default useEfetuarCadastro;