import { NavLink, Outlet } from "react-router-dom";
import useUsuarioStore from "../store/useUsuarioStore";
import Categoria from "../interfaces/Categoria";
import useCategoriasStore from "../store/useCategoriasStore";
import { useEffect } from "react";
import { getCategorias } from "../hooks/useCategoria";

const HomePage = () => {
  const usuario = useUsuarioStore((s) => s.usuario);
  const {categorias, setCategorias} = useCategoriasStore();

  useEffect(() => {
    getCategorias().then((categorias) => {setCategorias(categorias)});
  }, []);	

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
        <div className="nav flex-column nav-pills" style={{height: "520px", overflowY: "auto", flexWrap:"nowrap" }}>
          <NavLink aria-current="page" className="nav-link" to="/">
            Todos
          </NavLink>
          {categorias.map((categoria) => (
            <NavLink
              key={categoria.id}
              aria-current="page"
              className="nav-link"
              to={`/${categoria.nome}`}
            >
              {categoria.nome}
            </NavLink>
          ))
          }
        </div>
      </div>
      <div className="col-lg-10">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
