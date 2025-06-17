import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Button } from '@mui/material';
import AlertDialog from "../../components/Alert/AlertDialog";
import ProjectDialog from '../../components/Project/ProjectDialog';
import ProjectTable from "../../components/Project/ProjectTable";
const Dashboard = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [reloadTrigger, setReloadTrigger] = useState(0); // integer to trigger reload
    const handleProjectAdded = () => {
        setReloadTrigger(prev => prev + 1); // increment to trigger reload
        // setOpenDialog(false);
    };
    const [alert, setAlert] = useState({
        open: false,
        type: 'success',
        message: ''
    });
    return (_jsxs("div", { children: [_jsx(Button, { variant: "contained", onClick: () => setDialogOpen(true), children: "Add New Project" }), _jsx(ProjectTable, { reloadTrigger: reloadTrigger }), _jsx(ProjectDialog, { open: dialogOpen, onClose: () => setDialogOpen(false), setAlert: setAlert, handleProjectAdded: handleProjectAdded }), _jsx(AlertDialog, { open: alert.open, type: alert.type, message: alert.message, onClose: () => setAlert({ ...alert, open: false }) })] }));
};
export default Dashboard;
