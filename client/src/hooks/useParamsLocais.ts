import { useQuery } from "@tanstack/react-query";
// import Produto from "../interfaces/Produto";
import { URL_LOCAIS } from "../util/constants";
import useAPI from "./useAPI";
import Local from "../interfaces/Local";

const useParamsLocais = (idLocal: number) => {
  const { recuperarItem } = useAPI<Local>(`${URL_LOCAIS}/${idLocal}`);
  return useQuery({
    queryKey: ["local", idLocal],
    queryFn: () => recuperarItem(),
    staleTime: 10_000,
  });
};
export default useParamsLocais;
