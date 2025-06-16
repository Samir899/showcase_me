import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { API_CONFIG } from "../../api-config";
import {post} from "../../util/api/Api";
import {saveUser} from "../../util/localStorage";
import {HttpStatus} from "../../util/api/HttpStatus";

type AlertProps = {
    setAlert: (alert: { type: 'success' | 'error'; message: string } | null) => void;
}
const LoginForm: React.FC<AlertProps> = ({setAlert}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginPayload = {
        username: username,
        password: password,
    };
    interface LoginResponse {
        username: string;
        fullName: string;
        roles: string[]; // assuming multiple roles
        token: string;
    }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try {
          const response = await post<LoginResponse>(API_CONFIG.auth.login, loginPayload, [HttpStatus.OK]);
          saveUser(response.username, response.roles, response.fullName, response.token);
          setAlert({ type: 'success', message: 'Login successful!' });
          navigate('/dashboard');

      } catch (e) {
          // optionally show an error message to user here
          setAlert({ type: 'error', message: 'Signup failed. Please try again.' });
      }
  };

  return (
      <>

        <Paper elevation={3} className={styles.container}>
          <Typography variant="h5" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember Me"
            />

            <Button type="submit" variant="contained" fullWidth className={styles.submit}>
              Login
            </Button>

            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link onClick={() => navigate('/signup')} underline="hover" className={styles.signupLink}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
  </>
  );
};

export default LoginForm;
