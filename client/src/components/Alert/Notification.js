import { jsx as _jsx } from "react/jsx-runtime";
import { Alert, Box, Collapse } from "@mui/material";
import React, { useEffect } from "react";
const Notification = ({ setAlert, alert }) => {
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 3000); // Auto close after 3 seconds
            return () => clearTimeout(timer); // Clean up on unmount or alert change
        }
    }, [alert, setAlert]);
    return (_jsx(Box, { mb: 2, children: alert && (_jsx(Collapse, { in: !!alert, children: _jsx(Alert, { severity: alert.type, onClose: () => setAlert(null), sx: { mb: 2 }, children: alert.message }) })) }));
};
export default Notification;
