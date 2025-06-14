import React, { useState } from 'react';
import { Button } from '@mui/material';
import AlertDialog from "../../components/Alert/AlertDialog";
import ProjectDialog from '../../components/Project/ProjectDialog';
import ProjectTable from "../../components/Project/ProjectTable";

const Dashboard: React.FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [reloadTrigger, setReloadTrigger] = useState(0); // integer to trigger reload

    const handleProjectAdded = () => {
        setReloadTrigger(prev => prev + 1); // increment to trigger reload
        // setOpenDialog(false);
    };
    const [alert, setAlert] = useState<{ open: boolean, type: 'success' | 'error', message: string }>({
        open: false,
        type: 'success',
        message: ''
    });
    return (
        <div>
            <Button variant="contained" onClick={() => setDialogOpen(true)}>
                Add New Project
            </Button>
            <ProjectTable reloadTrigger={reloadTrigger}  />
            <ProjectDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                setAlert={setAlert}
                handleProjectAdded={handleProjectAdded}
            />
            <AlertDialog
                open={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}/>
        </div>
    );
};

export default Dashboard;
