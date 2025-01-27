import { Link, useNavigate, NavLink } from "react-router-dom";
import carrinho from "../assets/carrinho.png";
import useUsuarioStore from "../store/useUsuarioStore";
import useUsuario from "../hooks/useUsuario";
import { useEffect, useState } from "react";
import Usuario from "../interfaces/Usuario";
import useReservaStore from "../store/useReservaStore";
// import logout from "../hooks/useAPIAutenticacao";
// import useAPIAutenticacao from "../hooks/useAPIAutenticacao";

function NavBar() {
  let hasSelectedAProduct = false;
  const usuario = useUsuarioStore((s) => s.usuario);
  const reservas = useReservaStore((s) => s.reservas);
  const setUsuario = useUsuarioStore((s) => s.setUsuario);
  // const { logout } = useAPIAutenticacao();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // await logout();
      setUsuario({ id: 0, username: "", name: "", surname: "", email: "", phoneNumber: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // const { getUsuarioByEmail } = useUsuario();
  // const [usuario, setUsuario] = useState<Usuario | null>(null);

  // useEffect(() => {
  //   if (usuario?.email) {
  //     const fetchUsuario = async () => {
  //       const data = await getUsuarioByEmail(usuario.email);
  //       if (data  && data.length > 0) {
  //         setUsuario(data[0]);
  //         console.log("setei!" + data[0].name);
  //       }
  //     };
  //     fetchUsuario();
  //   }
  // }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand pb-0 mb-0">  
            <p style={{fontWeight: "bold", fontSize: 24, color: "grey", marginBottom: "8px"}}>VENUER</p>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsLinks" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsLinks" style={{position:"relative"}}>
            <ul className="navbar-nav mb-2 mb-lg-0" style={{position:"absolute", right: "0"}}>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/listar-locais">Busca de locais</NavLink>
              </li>
              { (usuario != null && usuario.email == "") ? (
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/login">Faça seu login!</NavLink>
                </li>
                ) : (
                <><li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/cadastrar-local">Cadastrar local</NavLink>
                  </li>
                  { (reservas.length > 0) ?
                    <li className="nav-item"> 
                      <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/reserva">Finalizar reserva</NavLink>
                    </li>
                  : <></>}
                  <li className="nav-item">
                      <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/" onClick={handleLogout}>Logout</NavLink>
                  </li>
                  </>
                )
              }
            </ul>
          </div>
        </div>
        {/* <div>
          {hasSelectedAProduct ? (
          <Link to="/carrinho">
            <img height="30px" src={carrinho} />
            Carrinho
          </Link>
          ) : null}
        </div> */}
      </nav>
      
    </>
  );
}

export default NavBar;
