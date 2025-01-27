import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URL_LOCAIS } from "../util/constants";
import useAPI from "./useAPI";
// import Produto from "../interfaces/Produto";
import Local from "../interfaces/Local";

const useCadastrarLocal = () => {
  const {cadastrar} = useAPI<Local>(URL_LOCAIS);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (local: Local) => cadastrar(local),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["locais"],
      }),
  });
};

export default useCadastrarLocal;
