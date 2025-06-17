import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box, IconButton } from '@mui/material';
import { CheckCircle, Error as ErrorIcon, Close as CloseIcon } from '@mui/icons-material';
const AlertDialog = ({ open, type, message, onClose }) => {
    const isSuccess = type === 'success';
    return (_jsxs(Dialog, { open: open, onClose: onClose, maxWidth: "xs", fullWidth: true, PaperProps: {
            style: {
                borderRadius: 16,
                padding: '8px 16px',
            },
        }, children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", px: 1, children: [_jsxs(Box, { display: "flex", alignItems: "center", children: [isSuccess ? (_jsx(CheckCircle, { color: "success", sx: { marginRight: 1 } })) : (_jsx(ErrorIcon, { color: "error", sx: { marginRight: 1 } })), _jsx(DialogTitle, { sx: { m: 0, p: 0 }, children: _jsx(Typography, { variant: "h6", fontWeight: "bold", children: isSuccess ? 'Success' : 'Error' }) })] }), _jsx(IconButton, { onClick: onClose, children: _jsx(CloseIcon, {}) })] }), _jsx(DialogContent, { dividers: true, children: _jsx(Typography, { variant: "body1", children: message }) }), _jsx(DialogActions, { children: _jsx(Button, { onClick: onClose, variant: "contained", color: isSuccess ? 'success' : 'error', children: "OK" }) })] }));
};
export default AlertDialog;
