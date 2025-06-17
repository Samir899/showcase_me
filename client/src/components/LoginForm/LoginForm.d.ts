import React from 'react';
type AlertProps = {
    setAlert: (alert: {
        type: 'success' | 'error';
        message: string;
    } | null) => void;
};
declare const LoginForm: React.FC<AlertProps>;
export default LoginForm;
