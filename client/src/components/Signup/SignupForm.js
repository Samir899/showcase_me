import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { post } from "../../util/api/Api";
import { API_CONFIG } from "../../api-config";
import { Alert, Collapse } from '@mui/material';
import { Box, Button, IconButton, InputAdornment, Link, Paper, TextField, Typography, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './SignupForm.module.css';
import { HttpStatus } from "../../util/api/HttpStatus";
const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'),
        confirmPassword: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await post(API_CONFIG.auth.signup, values, [HttpStatus.CREATED]);
                setAlert({ type: 'success', message: 'Signup successful! Redirecting to login...' });
                setTimeout(() => navigate('/login'), 2000); // optional: redirect on success
            }
            catch (e) {
                // optionally show an error message to user here
                setAlert({ type: 'error', message: 'Signup failed. Please try again.' });
            }
        },
    });
    return (_jsxs(_Fragment, { children: [_jsx(Box, { mb: 2, children: alert && (_jsx(Collapse, { in: !!alert, children: _jsx(Alert, { severity: alert.type, onClose: () => setAlert(null), sx: { mb: 2 }, children: alert.message }) })) }), _jsxs(Paper, { elevation: 3, className: styles.container, children: [_jsx(Typography, { variant: "h5", gutterBottom: true, children: "Sign Up" }), _jsxs("form", { onSubmit: formik.handleSubmit, className: styles.form, children: [_jsx(TextField, { label: "Email", name: "email", fullWidth: true, variant: "outlined", value: formik.values.email, onChange: formik.handleChange, onBlur: formik.handleBlur, error: formik.touched.email && !!formik.errors.email, helperText: formik.touched.email && formik.errors.email }), _jsx(TextField, { label: "Password", name: "password", type: showPassword ? 'text' : 'password', fullWidth: true, variant: "outlined", value: formik.values.password, onChange: formik.handleChange, onBlur: formik.handleBlur, error: formik.touched.password && !!formik.errors.password, helperText: formik.touched.password && formik.errors.password, InputProps: {
                                    endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { onClick: () => setShowPassword((prev) => !prev), edge: "end", children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                                } }), _jsx(TextField, { label: "Confirm Password", name: "confirmPassword", type: "password", fullWidth: true, variant: "outlined", value: formik.values.confirmPassword, onChange: formik.handleChange, onBlur: formik.handleBlur, error: formik.touched.confirmPassword && !!formik.errors.confirmPassword, helperText: formik.touched.confirmPassword && formik.errors.confirmPassword }), _jsx(Button, { type: "submit", variant: "contained", fullWidth: true, className: styles.submit, children: "Sign Up" }), _jsx(Box, { mt: 2, textAlign: "center", children: _jsxs(Typography, { variant: "body2", children: ["Already have an account?", ' ', _jsx(Link, { onClick: () => navigate('/login'), underline: "hover", className: styles.loginLink, children: "Log in" })] }) })] })] })] }));
};
export default SignupForm;
