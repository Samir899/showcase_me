import React, { useState, useEffect, useCallback } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Box,
    Stack,
    Typography,
    DialogContentText,
    DialogActions as ConfirmationActions,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { postFormWithJWT } from "../../util/api/Api";
import { API_CONFIG } from "../../api-config";
import {HttpStatus} from "../../util/api/HttpStatus";

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

const ProjectDialog: React.FC<ProjectDialogProps> = ({ open, onClose, setAlert, handleProjectAdded }) => {
    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tools, setTools] = useState<string[]>(['']);
    const [images, setImages] = useState<File[]>([]);
    const [overview, setOverview] = useState(() => EditorState.createEmpty());
    const [projectUrl, setProjectUrl] = useState('');

    // Track if form has changes
    const [dirty, setDirty] = useState(false);

    // Confirmation dialog for closing
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Reset form fields
    const resetForm = useCallback(() => {
        setTitle('');
        setDescription('');
        setTools(['']);
        setImages([]);
        setOverview(EditorState.createEmpty());
        setProjectUrl('');
        setDirty(false);
    }, []);

    // Mark dirty on any change
    useEffect(() => {
        if (open) setDirty(false); // reset dirty when dialog just opened
    }, [open]);

    useEffect(() => {
        if (title || description || tools.some(t => t !== '') || images.length > 0 || projectUrl || overview.getCurrentContent().hasText()) {
            setDirty(true);
        } else {
            setDirty(false);
        }
    }, [title, description, tools, images, projectUrl, overview]);

    // Handle dialog close click
    const handleCloseClick = () => {
        if (dirty) {
            setConfirmOpen(true);
        } else {
            resetForm();
            onClose();
        }
    };

    // Confirm close dialog without saving
    const handleConfirmClose = () => {
        setConfirmOpen(false);
        resetForm();
        onClose();
    };

    // Cancel close dialog
    const handleCancelClose = () => {
        setConfirmOpen(false);
    };

    const handleToolChange = (index: number, value: string) => {
        const updatedTools = [...tools];
        updatedTools[index] = value;
        setTools(updatedTools);
    };

    const handleAddTool = () => {
        setTools([...tools, '']);
    };

    const handleRemoveTool = (index: number) => {
        const updatedTools = tools.filter((_, i) => i !== index);
        setTools(updatedTools);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleSubmit = async () => {
        const overviewHtml = stateToHTML(overview.getCurrentContent());

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('projectUrl', projectUrl);
        formData.append('overview', overviewHtml);

        tools.forEach(tool => {
            formData.append("tools", tool);
        });
        images.forEach(image => {
            formData.append("images", image);
        });

        try {
            const response = await postFormWithJWT(API_CONFIG.projects.project, formData, [HttpStatus.CREATED]);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setAlert({ open: true, type: 'success', message: response.message || 'Project created successfully!' });
            resetForm();
            handleProjectAdded();
            onClose();
        } catch (err: any) {
            console.error('Error submitting project:', err);
            setAlert({ open: true, type: 'error', message: err.message || 'Submission failed. Try again later.' });
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleCloseClick} fullWidth maxWidth="md">
                <DialogTitle>Add New Project</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField
                            label="Project Title"
                            fullWidth
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            label="Project Description"
                            fullWidth
                            required
                            multiline
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            label="Project URL"
                            fullWidth
                            value={projectUrl}
                            onChange={(e) => setProjectUrl(e.target.value)}
                            type="url"
                            placeholder="https://example.com"
                        />
                        <RichTextEditor value={overview} onChange={setOverview} />
                        <Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <span>Tools Used</span>
                                <Button variant="outlined" size="small" onClick={handleAddTool} startIcon={<Add />}>
                                    Add Tool
                                </Button>
                            </Box>
                            <Stack spacing={1}>
                                {tools.map((tool, index) => (
                                    <Box key={index} display="flex" gap={1} alignItems="center">
                                        <TextField
                                            fullWidth
                                            placeholder={`Tool ${index + 1}`}
                                            value={tool}
                                            onChange={(e) => handleToolChange(index, e.target.value)}
                                        />
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemoveTool(index)}
                                            disabled={tools.length === 1}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>

                        <Box>
                            <Typography variant="h6" gutterBottom>Upload Images</Typography>
                            <Button variant="outlined" component="label">
                                Choose Files
                                <input type="file" multiple hidden onChange={handleImageUpload} />
                            </Button>

                            <Box mt={2}>
                                {images.length > 0 && (
                                    <Box display="flex" flexWrap="wrap" gap={2}>
                                        {images.map((image, index) => (
                                            <Box key={index} display="flex" flexDirection="column" alignItems="center">
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`preview-${index}`}
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleRemoveImage(index)}
                                                    sx={{ mt: 1 }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseClick}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation dialog for closing with unsaved changes */}
            <Dialog open={confirmOpen} onClose={handleCancelClose}>
                <DialogTitle>Discard Changes?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have unsaved changes. Are you sure you want to close without saving? Your changes will be lost.
                    </DialogContentText>
                </DialogContent>
                <ConfirmationActions>
                    <Button onClick={handleCancelClose}>Cancel</Button>
                    <Button color="error" onClick={handleConfirmClose} autoFocus>Discard</Button>
                </ConfirmationActions>
            </Dialog>
        </>
    );
};

export default ProjectDialog;
