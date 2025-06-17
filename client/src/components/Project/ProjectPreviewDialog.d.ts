import React from 'react';
type Project = {
    id: number;
    title: string;
    description: string;
    overview: string;
    url: string;
    tools: string[];
    images: string[];
};
type Props = {
    open: boolean;
    onClose: () => void;
    project: Project | null;
};
declare const ProjectPreviewDialog: React.FC<Props>;
export default ProjectPreviewDialog;
