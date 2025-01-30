import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "./Layout";
import ListaDeProdutosPage from "../pages/ListaDeProdutosPage";
import LoginPage from "../pages/LoginPage";
import CadastroDeProdutosPage from "../pages/CadastroDeLocaisPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import ErrorPage from "../pages/ErrorPage";
import CardsDeProdutosPage from "../pages/CardsDeLocaisPage";
import EditarLocalPage from "../pages/EditarLocalPage";
import PrivateRoutes from "./PrivateRoutes";
import DetalhesLocal from "../pages/DetalhesLocal";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          { path: ":nomeCategoria?", element: <CardsDeProdutosPage /> },
          
        ],
      },
      { path: "locais/:idLocal", element: <DetalhesLocal /> },
      { path: "listar-locais", element: <ListaDeProdutosPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [

      { path: "editar-local", element: <EditarLocalPage/> },
      { path: "cadastrar-local", element: <CadastroDeProdutosPage /> },
      { path: "reserva", element: <CarrinhoPage /> },
      { path: "perfil", element: <Profile /> },
    ],
  }
]);
export default router;
