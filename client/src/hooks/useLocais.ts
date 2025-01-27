import { useQuery } from "@tanstack/react-query";
// import Produto from "../interfaces/Produto";
import { URL_LOCAIS } from "../util/constants";
import useAPI from "./useAPI";
import Local from "../interfaces/Local";

const useLocais = () => {
  const { recuperar } = useAPI<Local>(URL_LOCAIS);
  return useQuery({
    queryKey: ["locais"],
    queryFn: () => recuperar(),
    // axios
    //     .get("http://localhost:8080/produtos")
    //     .then((response) => response.data),
    staleTime: 10_000,
  });
};
export default useLocais;
