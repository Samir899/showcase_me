import React from 'react';
interface AlertDialogProps {
    open: boolean;
    type: 'success' | 'error';
    message: string;
    onClose: () => void;
}
declare const AlertDialog: React.FC<AlertDialogProps>;
export default AlertDialog;
