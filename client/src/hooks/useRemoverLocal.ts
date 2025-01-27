import { useMutation, useQueryClient } from "@tanstack/react-query";
import { URL_LOCAIS } from "../util/constants";
import useAPI from "./useAPI";
// import Produto from "../interfaces/Produto";
import Local from "../interfaces/Local";

const useRemoverLocal = () => {
  const {remover} = useAPI<Local>(URL_LOCAIS);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => remover(id),
      // axios
      //   .delete("http://localhost:8080/produtos/" + id)
      //   .then((res) => res.data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["locais"],
      }),
  });
};

export default useRemoverLocal;
