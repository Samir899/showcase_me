import React, { useState } from 'react';
import {post} from "../../util/api/Api";
import {API_CONFIG} from "../../api-config";
import { Alert, Collapse } from '@mui/material';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './SignupForm.module.css';
import {HttpStatus} from "../../util/api/HttpStatus";

const SignupForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
            ),
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
                console.log(response);
                setAlert({ type: 'success', message: 'Signup successful! Redirecting to login...' });
                setTimeout(() => navigate('/login'), 2000); // optional: redirect on success
            } catch {
                // optionally show an error message to user here
                setAlert({ type: 'error', message: 'Signup failed. Please try again.' });
            }
        },
    });
    return (
        <>
            <Box mb={2}>
                {alert && (
                    <Collapse in={!!alert}>
                        <Alert
                            severity={alert.type}
                            onClose={() => setAlert(null)}
                            sx={{ mb: 2 }}
                        >
                            {alert.message}
                        </Alert>
                    </Collapse>
                )}
            </Box>


            <Paper elevation={3} className={styles.container}>
                <Typography variant="h5" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        variant="outlined"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        variant="outlined"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.confirmPassword && !!formik.errors.confirmPassword
                        }
                        helperText={
                            formik.touched.confirmPassword && formik.errors.confirmPassword
                        }
                    />

                    <Button type="submit" variant="contained" fullWidth className={styles.submit}>
                        Sign Up
                    </Button>

                    <Box mt={2} textAlign="center">
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link
                                onClick={() => navigate('/login')}
                                underline="hover"
                                className={styles.loginLink}
                            >
                                Log in
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Paper>
        </>
    );
};

export default SignupForm;
