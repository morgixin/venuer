import { NavLink, Outlet } from "react-router-dom";
import useUsuarioStore from "../store/useUsuarioStore";

const HomePage = () => {
  const usuario = useUsuarioStore((s) => s.usuario);
  return (
    <div className="row">
      { (usuario != null && usuario.name != "") ? (
        <div className="container mb-3">
          <p style={{fontSize:"18px", color: "gray"}}>Bem-vindo de volta, {usuario.name}!</p>
        </div>)
        : <></>
      }
      <div className="col-lg-2">
        <h5>Categorias</h5>
        <div className="nav flex-column nav-pills">
          <NavLink aria-current="page" className="nav-link" to="/">
            Todos
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/sala">
            Salas
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/salao">
            Salões
          </NavLink>
          <NavLink aria-current="page" className="nav-link" to="/estudio">
            Estúdios
          </NavLink>
        </div>
      </div>
      <div className="col-lg-10">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
