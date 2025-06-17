import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // ✅ IMPORTANT: direct import
const ProjectPreviewDialog = ({ open, onClose, project }) => {
    if (!project)
        return null;
    return (_jsxs(Dialog, { open: open, onClose: onClose, fullWidth: true, maxWidth: "md", children: [_jsx(DialogTitle, { children: project.title }), _jsxs(DialogContent, { dividers: true, children: [_jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: project.description }), _jsx(Typography, { variant: "body2", gutterBottom: true, dangerouslySetInnerHTML: { __html: project.overview } }), _jsxs(Typography, { variant: "body2", gutterBottom: true, children: [_jsx("strong", { children: "URL:" }), ' ', _jsx("a", { href: project.url, target: "_blank", rel: "noopener noreferrer", children: project.url })] }), _jsxs(Typography, { variant: "body2", gutterBottom: true, children: [_jsx("strong", { children: "Tools:" }), " ", project.tools.join(', ')] }), _jsx(Grid, { container: true, spacing: 2, sx: { mt: 2 }, children: project.images.map((img, idx) => (
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        _jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsx("img", { src: img, alt: `Project image ${idx + 1}`, style: { width: '100%', borderRadius: 8 } }) }, idx))) })] })] }));
};
export default ProjectPreviewDialog;
