import TabelaDeProdutos from "../components/TabelaDeProdutos";
import Paginacao from "../components/Paginacao";
import useUsuarioStore from "../store/useUsuarioStore";

const Profile = () => {
    const usuario = useUsuarioStore((s) => s.usuario);

    return (
        <>
            <h5 style={{color:"gray", marginTop:"24px"}}>PERFIL</h5>

            <p style={{color:"gray", marginTop:"24px", marginBottom:"0"}}>Nome completo</p>
            {usuario && usuario.email !== "" && (
                <>
                    <h3>{usuario.name} {usuario.surname}</h3>
                    <p style={{color:"gray", marginTop:"24px", marginBottom:"0"}}>E-mail e telefone</p>
                    <p><a href={`mailto:${usuario.email}`} style={{color:"black", textDecoration:"none"}}>{usuario.email}</a> - {usuario.phoneNumber}</p>
                </>
            )}
            <TabelaDeProdutos usuario={usuario} filterByUser={true}/>
            <Paginacao />
        </>
    )
}

export default Profile