import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import Produto from "../interfaces/Produto";
import { URL_LOCAIS } from "../util/constants";
import useAPI from "./useAPI";
import Local from "../interfaces/Local";

interface QueryString {
  pagina: number;
  tamanho: number;
  nome: string;
  sortField: string;
  sortOrder: string;
}
const useLocaisComPaginacao = (queryString: QueryString) => {
  const { recuperarPagina } = useAPI<Local>(URL_LOCAIS);

  return useQuery({
    queryKey: ["locais", "paginacao", queryString],
    queryFn: () =>
      recuperarPagina({
        params: {
          ...queryString,
        },
      }),
    // axios
    //   .get<ResultadoPaginado<Produto>>(
    //     "http://localhost:8080/produtos/paginacao",
    //     {
    //       params: {
    //         ...queryString,
    //       },
    //     }
    //   )
    //   .then((response) => response.data),
    staleTime: 10_000,
    placeholderData: keepPreviousData,
  });
};
export default useLocaisComPaginacao;
