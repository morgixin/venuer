import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import ResultadoPaginado from "../interfaces/ResultadoPaginado";
import useAPILocal from "./useAPILocal";
import Local from "../interfaces/Local";

interface QueryString {
  tamanho: number;
  nomeCategoria?: string;
}
const useLocaisPaginadosPeloNomeDaCategoria = (queryString: QueryString) => {
  const { recuperarLocaisPaginadosPeloNomeDaCategoria } = useAPILocal();

  return useInfiniteQuery<ResultadoPaginado<Local>>({
    queryKey: ["locais", "categoria", "paginacao", queryString],
    queryFn: ({pageParam}) =>
      recuperarLocaisPaginadosPeloNomeDaCategoria({
        params: {
          pagina: pageParam,
          ...queryString,
        },
      }),
    staleTime: 10_000,
    initialPageParam: 0,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.paginaCorrente < lastPage.totalDePaginas - 1 ? lastPage.paginaCorrente + 1 : undefined;
    }
  });
};
export default useLocaisPaginadosPeloNomeDaCategoria;
