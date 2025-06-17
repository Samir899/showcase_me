import React from 'react';
type ProjectDialogProps = {
    open: boolean;
    onClose: () => void;
    setAlert: React.Dispatch<React.SetStateAction<{
        open: boolean;
        type: 'success' | 'error';
        message: string;
    }>>;
    handleProjectAdded: () => void;
};
declare const ProjectDialog: React.FC<ProjectDialogProps>;
export default ProjectDialog;
