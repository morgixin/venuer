import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import loginIcon from "../assets/skin/login.png";
// import useEfetuarLogin from "../hooks/useEfetuarLogin";
import useUsuarioStore from "../store/useUsuarioStore";
import Usuario from "../interfaces/Usuario";
import useEfetuarCadastro from "../hooks/useEfetuarCadastro";

const schema = z.object({
  email: z.string().min(1, { message: "O e-mail deve ser informado." }),
  password: z.string().min(1, { message: "A senha deve ser informada." }),
  username: z.string().min(1, { message: "O username deve ser informado." }),
  name: z.string().min(1, { message: "O nome deve ser informado." }),
  surname: z.string().min(1, { message: "O sobrenome deve ser informado." }),
  phoneNumber: z.string().min(1, { message: "O telefone deve ser informado." }),
});

type FormLogin = z.infer<typeof schema>;

const SigninForm = () => {
  const setUsuario = useUsuarioStore((s) => s.setUsuario);
  const setTentouLogar = useUsuarioStore((s) => s.setTentouLogar);
  const tentouLogar = useUsuarioStore((s) => s.tentouLogar);

  const { mutate: efetuarCadastro, reset, error: errorLogin } = useEfetuarCadastro();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitSuccessful, errors },
  } = useForm<FormLogin>({ resolver: zodResolver(schema) });
  
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


  useEffect(() => {
    console.log("isSubmitSuccessful executado");
    setFocus("email");
    if (isSubmitSuccessful) {
      reset();
      // set({} as Local);
    }    
  }, [isSubmitSuccessful]);

  const submit = (data : FormLogin) => {
    efetuarCadastro(
      data,
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
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-2" style={{ display: "flex", justifyContent: "flex-start", gap: "30px" }}>
          <div className="mb-2">
            <label htmlFor="email" className="fw-bold mb-2">
              E-mail
            </label>
            <div className="col-lg-5">
              <input
                {...register("email")}
                type="text"
                id="email"
                style={{ width: "300px" }}
                className={
                  errors.email
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="username" className=" fw-bold mb-2">
              Username
            </label>
            <div className="col-lg-5">
              <input
                {...register("username")}
                type="text"
                id="username"
                style={{ width: "300px" }}
                className={
                  errors.username
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
          </div>
        </div>

        <div className="mb-2" style={{ display: "flex", justifyContent: "flex-start", gap: "30px" }}>
          <div className="mb-2">
            <label htmlFor="name" className="fw-bold mb-2">
              Nome
            </label>
            <div className="col-lg-5">
              <input
                {...register("name")}
                type="text"
                id="name"
                style={{ width: "300px" }}
                className={
                  errors.name
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="surname" className="fw-bold mb-2">
              Sobrenome
            </label>
            <div className="col-lg-5">
              <input
                {...register("surname")}
                type="text"
                id="surname"
                style={{ width: "300px" }}
                className={
                  errors.surname
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.surname?.message}</div>
            </div>
          </div>
        </div>

        <div className="mb-2" style={{ display: "flex", justifyContent: "flex-start", gap: "30px" }}>
          <div className="mb-2">
            <label htmlFor="phoneNumber" className="fw-bold mb-2">
              Telefone
            </label>
            <div className="col-lg-5">
              <input
                {...register("phoneNumber")}
                type="text"
                id="phoneNumber"
                style={{ width: "300px" }}
                className={
                  errors.phoneNumber
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.phoneNumber?.message}</div>
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="fw-bold mb-2">
              Senha
            </label>
            <div className="col-lg-5">
              <input
                {...register("password")}
                type="password"
                id="password"
                style={{ width: "300px" }}
                className={
                  errors.password
                    ? "form-control form-control-sm is-invalid"
                    : "form-control form-control-sm"
                }
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-lg-5 mt-4">
            <button type="submit" className="btn btn-outline-primary">
              <img src={loginIcon} /> Criar conta
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SigninForm;