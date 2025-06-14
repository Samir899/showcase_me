import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // ✅ IMPORTANT: direct import

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

const ProjectPreviewDialog: React.FC<Props> = ({ open, onClose, project }) => {
    if (!project) return null;

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{project.title}</DialogTitle>
            <DialogContent dividers>
                <Typography variant="subtitle1" gutterBottom>
                    {project.description}
                </Typography>

                <Typography variant="body2" gutterBottom dangerouslySetInnerHTML={{ __html: project.overview }} />

                <Typography variant="body2" gutterBottom>
                    <strong>URL:</strong>{' '}
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                        {project.url}
                    </a>
                </Typography>

                <Typography variant="body2" gutterBottom>
                    <strong>Tools:</strong> {project.tools.join(', ')}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {project.images.map((img, idx) => (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <img
                                src={img}
                                alt={`Project image ${idx + 1}`}
                                style={{ width: '100%', borderRadius: 8 }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectPreviewDialog;
