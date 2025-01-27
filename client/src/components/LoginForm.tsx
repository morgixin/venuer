import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import loginIcon from "../assets/skin/login.png";
import useEfetuarLogin from "../hooks/useEfetuarLogin";
import useUsuarioStore from "../store/useUsuarioStore";
import Usuario from "../interfaces/Usuario";

const schema = z.object({
  email: z.string().min(1, { message: "O e-mail deve ser informado." }),
  password: z.string().min(1, { message: "A senha deve ser informada." }),
});

type FormLogin = z.infer<typeof schema>;

const LoginForm = () => {
  const setUsuario = useUsuarioStore((s) => s.setUsuario);
  const setTentouLogar = useUsuarioStore((s) => s.setTentouLogar);
  const tentouLogar = useUsuarioStore((s) => s.tentouLogar);

  const { mutate: efetuarLogin, error: errorLogin } = useEfetuarLogin();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setFocus("email");
    setTentouLogar(false);
    setUsuario({
      id: 0,
      username: "",
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      password: "",
    });
  }, []);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormLogin>({ resolver: zodResolver(schema) });

  const submit = ({ email, password }: FormLogin) => {
    efetuarLogin(
      { email, password },
      {
        onSuccess: (usuarioResponse: Usuario) => {
          if (usuarioResponse.id !== 0) {
            setUsuario(usuarioResponse);
            if (location.state && location.state.from) {
              navigate(location.state.from);
            } else {
              navigate("/");
            }
          } else {
            setTentouLogar(true);
            setUsuario({
              id: 0,
              username: "",
              name: "",
              surname: "",
              email: "",
              phoneNumber: "",
              password: "",
            });
          }
        },
      }
    );
  };

  if (errorLogin) throw errorLogin;

  return (
    <>
      {tentouLogar && (
        <div className="alert alert-danger fw-bold" role="alert">
          Login inválido!
        </div>
      )}
      <form onSubmit={handleSubmit(submit)}>
        <div className="row mb-2">
          <label htmlFor="email" className="col-lg-1 fw-bold mb-2">
            E-mail
          </label>
          <div className="col-lg-5">
            <input
              {...register("email")}
              type="text"
              id="email"
              className={
                errors.email
                  ? "form-control form-control-sm is-invalid"
                  : "form-control form-control-sm"
              }
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="password" className="col-lg-1 fw-bold mb-2">
            Senha
          </label>
          <div className="col-lg-5">
            <input
              {...register("password")}
              type="password"
              id="password"
              className={
                errors.password
                  ? "form-control form-control-sm is-invalid"
                  : "form-control form-control-sm"
              }
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
        </div>

        <div className="row">
          <div className="offset-lg-1 col-lg-5">
            <button type="submit" className="btn btn-outline-primary">
              <img src={loginIcon} /> Entrar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;