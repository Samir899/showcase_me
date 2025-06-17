import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Box, Stack, Typography, DialogContentText, DialogActions as ConfirmationActions, } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { postFormWithJWT } from "../../util/api/Api";
import { API_CONFIG } from "../../api-config";
import { HttpStatus } from "../../util/api/HttpStatus";
const ProjectDialog = ({ open, onClose, setAlert, handleProjectAdded }) => {
    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tools, setTools] = useState(['']);
    const [images, setImages] = useState([]);
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
        if (open)
            setDirty(false); // reset dirty when dialog just opened
    }, [open]);
    useEffect(() => {
        if (title || description || tools.some(t => t !== '') || images.length > 0 || projectUrl || overview.getCurrentContent().hasText()) {
            setDirty(true);
        }
        else {
            setDirty(false);
        }
    }, [title, description, tools, images, projectUrl, overview]);
    // Handle dialog close click
    const handleCloseClick = () => {
        if (dirty) {
            setConfirmOpen(true);
        }
        else {
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
    const handleToolChange = (index, value) => {
        const updatedTools = [...tools];
        updatedTools[index] = value;
        setTools(updatedTools);
    };
    const handleAddTool = () => {
        setTools([...tools, '']);
    };
    const handleRemoveTool = (index) => {
        const updatedTools = tools.filter((_, i) => i !== index);
        setTools(updatedTools);
    };
    const handleImageUpload = (e) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };
    const handleRemoveImage = (index) => {
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
        }
        catch (err) {
            console.error('Error submitting project:', err);
            setAlert({ open: true, type: 'error', message: err.message || 'Submission failed. Try again later.' });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Dialog, { open: open, onClose: handleCloseClick, fullWidth: true, maxWidth: "md", children: [_jsx(DialogTitle, { children: "Add New Project" }), _jsx(DialogContent, { children: _jsxs(Stack, { spacing: 2, mt: 1, children: [_jsx(TextField, { label: "Project Title", fullWidth: true, required: true, value: title, onChange: (e) => setTitle(e.target.value) }), _jsx(TextField, { label: "Project Description", fullWidth: true, required: true, multiline: true, rows: 3, value: description, onChange: (e) => setDescription(e.target.value) }), _jsx(TextField, { label: "Project URL", fullWidth: true, value: projectUrl, onChange: (e) => setProjectUrl(e.target.value), type: "url", placeholder: "https://example.com" }), _jsx(RichTextEditor, { value: overview, onChange: setOverview }), _jsxs(Box, { children: [_jsxs(Box, { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, children: [_jsx("span", { children: "Tools Used" }), _jsx(Button, { variant: "outlined", size: "small", onClick: handleAddTool, startIcon: _jsx(Add, {}), children: "Add Tool" })] }), _jsx(Stack, { spacing: 1, children: tools.map((tool, index) => (_jsxs(Box, { display: "flex", gap: 1, alignItems: "center", children: [_jsx(TextField, { fullWidth: true, placeholder: `Tool ${index + 1}`, value: tool, onChange: (e) => handleToolChange(index, e.target.value) }), _jsx(IconButton, { color: "error", onClick: () => handleRemoveTool(index), disabled: tools.length === 1, children: _jsx(Delete, {}) })] }, index))) })] }), _jsxs(Box, { children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Upload Images" }), _jsxs(Button, { variant: "outlined", component: "label", children: ["Choose Files", _jsx("input", { type: "file", multiple: true, hidden: true, onChange: handleImageUpload })] }), _jsx(Box, { mt: 2, children: images.length > 0 && (_jsx(Box, { display: "flex", flexWrap: "wrap", gap: 2, children: images.map((image, index) => (_jsxs(Box, { display: "flex", flexDirection: "column", alignItems: "center", children: [_jsx("img", { src: URL.createObjectURL(image), alt: `preview-${index}`, style: { width: '100px', height: '100px', objectFit: 'cover' } }), _jsx(IconButton, { color: "error", onClick: () => handleRemoveImage(index), sx: { mt: 1 }, children: _jsx(Delete, {}) })] }, index))) })) })] })] }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseClick, children: "Cancel" }), _jsx(Button, { onClick: handleSubmit, variant: "contained", children: "Submit" })] })] }), _jsxs(Dialog, { open: confirmOpen, onClose: handleCancelClose, children: [_jsx(DialogTitle, { children: "Discard Changes?" }), _jsx(DialogContent, { children: _jsx(DialogContentText, { children: "You have unsaved changes. Are you sure you want to close without saving? Your changes will be lost." }) }), _jsxs(ConfirmationActions, { children: [_jsx(Button, { onClick: handleCancelClose, children: "Cancel" }), _jsx(Button, { color: "error", onClick: handleConfirmClose, autoFocus: true, children: "Discard" })] })] })] }));
};
export default ProjectDialog;
