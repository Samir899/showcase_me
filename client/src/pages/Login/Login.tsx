import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from "../../components/Logo/Logo";
import React from "react";

type AlertProps = {
    setAlert: (alert: { type: 'success' | 'error'; message: string } | null) => void;
}

const Login: React.FC<AlertProps> = ({setAlert}) => {
  return (
      <>
          <Logo />
          <LoginForm setAlert={setAlert}/>
      </>

  );
};

export default Login;
