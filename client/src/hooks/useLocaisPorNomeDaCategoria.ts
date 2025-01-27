import { useQuery } from "@tanstack/react-query";
import useAPILocal from "./useAPILocal";

const useLocaisPorNomeDaCategoria = (nome?: string) => {
  const { recuperarLocaisPorNomeDaCategoria } = useAPILocal();
  return useQuery({
    queryKey: nome ? ["locais", "categoria", nome] : ["locais"],
    queryFn: () => recuperarLocaisPorNomeDaCategoria(nome),
    staleTime: 10_000,
  });
};
export default useLocaisPorNomeDaCategoria;
