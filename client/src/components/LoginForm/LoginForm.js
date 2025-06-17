import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Link, TextField, Typography, Paper, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { API_CONFIG } from "../../api-config";
import { post } from "../../util/api/Api";
import { saveUser } from "../../util/localStorage";
import { HttpStatus } from "../../util/api/HttpStatus";
const LoginForm = ({ setAlert }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const loginPayload = {
        username: username,
        password: password,
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await post(API_CONFIG.auth.login, loginPayload, [HttpStatus.OK]);
            saveUser(response.username, response.roles, response.fullName, response.token);
            setAlert({ type: 'success', message: 'Login successful!' });
            navigate('/dashboard');
        }
        catch (e) {
            // optionally show an error message to user here
            setAlert({ type: 'error', message: 'Signup failed. Please try again.' });
        }
    };
    return (_jsx(_Fragment, { children: _jsxs(Paper, { elevation: 3, className: styles.container, children: [_jsx(Typography, { variant: "h5", component: "h1", gutterBottom: true, children: "Login" }), _jsxs("form", { onSubmit: handleSubmit, className: styles.form, children: [_jsx(TextField, { label: "Username", variant: "outlined", fullWidth: true, required: true, value: username, onChange: (e) => setUsername(e.target.value) }), _jsx(TextField, { label: "Password", variant: "outlined", fullWidth: true, required: true, type: showPassword ? 'text' : 'password', value: password, onChange: (e) => setPassword(e.target.value), InputProps: {
                                endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { onClick: () => setShowPassword((show) => !show), edge: "end", "aria-label": "toggle password visibility", children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                            } }), _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: rememberMe, onChange: (e) => setRememberMe(e.target.checked), color: "primary" }), label: "Remember Me" }), _jsx(Button, { type: "submit", variant: "contained", fullWidth: true, className: styles.submit, children: "Login" }), _jsx(Box, { mt: 2, textAlign: "center", children: _jsxs(Typography, { variant: "body2", children: ["Don't have an account?", ' ', _jsx(Link, { onClick: () => navigate('/signup'), underline: "hover", className: styles.signupLink, children: "Sign up" })] }) })] })] }) }));
};
export default LoginForm;
