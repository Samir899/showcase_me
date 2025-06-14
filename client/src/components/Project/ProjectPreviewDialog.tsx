// components/ProjectPreviewDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, Chip, Grid } from '@mui/material';

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
    project: Project | null;
    onClose: () => void;
};

const ProjectPreviewDialog: React.FC<Props> = ({ open, project, onClose }) => {
    if (!project) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogContent dividers>
                <Typography variant="subtitle1" gutterBottom>
                    Description:
                </Typography>
                <Typography gutterBottom>{project.description}</Typography>

                <Typography variant="subtitle1" gutterBottom>
                    Overview:
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: project.overview }} />

                <Typography variant="subtitle1" gutterBottom mt={2}>
                    URL:
                </Typography>
                <Typography>
                    <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer">
                        {project.url}
                    </a>
                </Typography>

                {project.tools?.length > 0 && (
                    <>
                        <Typography variant="subtitle1" gutterBottom mt={2}>
                            Tools Used:
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {project.tools.map((tool, i) => (
                                <Chip key={i} label={tool} color="primary" variant="outlined" />
                            ))}
                        </Box>
                    </>
                )}

                {project.images?.length > 0 && (
                    <>
                        <Typography variant="subtitle1" gutterBottom mt={2}>
                            Images:
                        </Typography>
                        <Grid container spacing={2}>
                            {project.images.map((img, i) => (
                                <Grid item key={i} xs={12} sm={6} md={4}>
                                    <img
                                        src={img}
                                        alt={`Project ${i}`}
                                        style={{ width: '100%', borderRadius: 8 }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ProjectPreviewDialog;
