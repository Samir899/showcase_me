import {Box, Collapse} from "@mui/material";
import React from "react";

type AlertProps = {
    alert: { type: 'success' | 'error'; message: string } | null;
    setAlert: (alert: { type: 'success' | 'error'; message: string } | null) => void;
}
const Alert: React.FC<AlertProps> = ({setAlert, alert}) => {

    return (<>
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

    </>);
};

export default Alert
