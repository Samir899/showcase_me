import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Box,
    IconButton
} from '@mui/material';
import { CheckCircle, Error as ErrorIcon, Close as CloseIcon } from '@mui/icons-material';

interface AlertDialogProps {
    open: boolean;
    type: 'success' | 'error';
    message: string;
    onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, type, message, onClose }) => {
    const isSuccess = type === 'success';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                style: {
                    borderRadius: 16,
                    padding: '8px 16px',
                },
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" px={1}>
                <Box display="flex" alignItems="center">
                    {isSuccess ? (
                        <CheckCircle color="success" sx={{ marginRight: 1 }} />
                    ) : (
                        <ErrorIcon color="error" sx={{ marginRight: 1 }} />
                    )}
                    <DialogTitle sx={{ m: 0, p: 0 }}>
                        <Typography variant="h6" fontWeight="bold">
                            {isSuccess ? 'Success' : 'Error'}
                        </Typography>
                    </DialogTitle>
                </Box>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent dividers>
                <Typography variant="body1">{message}</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="contained" color={isSuccess ? 'success' : 'error'}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
