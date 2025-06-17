import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from "../../components/Logo/Logo";
import React from "react";
const Login = ({ setAlert }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Logo, {}), _jsx(LoginForm, { setAlert: setAlert })] }));
};
export default Login;
