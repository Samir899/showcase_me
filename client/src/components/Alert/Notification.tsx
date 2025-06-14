import { Alert, Box, Collapse } from "@mui/material";
import React, { useEffect } from "react";

type AlertProps = {
    alert: { type: 'success' | 'error'; message: string } | null;
    setAlert: (alert: { type: 'success' | 'error'; message: string } | null) => void;
};

const Notification: React.FC<AlertProps> = ({ setAlert, alert }) => {
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 3000); // Auto close after 3 seconds

            return () => clearTimeout(timer); // Clean up on unmount or alert change
        }
    }, [alert, setAlert]);

    return (
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
    );
};

export default Notification;
