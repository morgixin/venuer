import { Navigate, useLocation } from "react-router-dom";
import useUsuarioStore from "../store/useUsuarioStore"
import Layout from "./Layout";

const PrivateRoutes = () => {
  const usuario = useUsuarioStore(s => s.usuario);

  const location = useLocation();

  if (usuario == null || usuario.email == "") {
    return <Navigate to="/login" state={{from: location.pathname}} />
  }
  else {
    return <Layout />
  }
}
export default PrivateRoutes