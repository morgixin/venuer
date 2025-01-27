import { useMutation } from "@tanstack/react-query";
import useAPIAutenticacao from "./useAPIAutenticacao";
// import Usuario from "../interfaces/Usuario";

const useEfetuarLogin = () => {
  const { login } = useAPIAutenticacao();

  return useMutation({
    mutationFn: (usuario: { email: string; password: string }) => login(usuario),
  });
};

export default useEfetuarLogin;