import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SigninForm from "../components/SigninForm";

const LoginPage = () => {
  const [isSignin, setIsSignin] = useState(false);


  const toggleSwitchLoginSignin = () => {
    setIsSignin(isSignin => !isSignin);
  };

  return (
    <>
    <button className="btn btn-outline-primary" type="button" style={{marginBottom:"12px"}} onClick={toggleSwitchLoginSignin}>
      {isSignin ? "Logar" : "Criar conta"}
    </button>
      <div className="mb-4">
        <h5>Página de Login</h5>
        <hr className="mt-0" />
      </div>


      {isSignin? 
        <SigninForm /> : 
        <LoginForm />
      }
    </>
  );
};
export default LoginPage;
