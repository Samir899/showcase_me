import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteWithJWT, getWithJWT } from '../../util/api/Api';
import { API_CONFIG } from '../../api-config';
import ProjectPreviewDialog from './ProjectPreviewDialog';
import { HttpStatus } from "../../util/api/HttpStatus";
const ProjectTable = ({ reloadTrigger }) => {
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(0); // 0-indexed
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [previewProject, setPreviewProject] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const handlePreview = async (projectId) => {
        try {
            const project = await getWithJWT(`${API_CONFIG.projects.project}/${projectId}`, [HttpStatus.OK]);
            setPreviewProject(project);
            setIsPreviewOpen(true);
        }
        catch (error) {
            console.error('Failed to fetch project details:', error);
            Swal.fire('Error', 'Could not load project preview.', 'error');
        }
    };
    const handleDelete = async (projectIndex) => {
        const project = projects[projectIndex];
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete the project "${project.title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
        if (confirmed.isConfirmed) {
            try {
                await deleteWithJWT(`${API_CONFIG.projects.project}/${project.id}`, [HttpStatus.OK]);
                Swal.fire('Deleted!', 'Project has been deleted.', 'success');
                fetchProjects(page, rowsPerPage); // Reload table
            }
            catch (error) {
                console.error('Failed to delete project:', error);
                Swal.fire('Error', 'Could not delete the project.', 'error');
            }
        }
    };
    const fetchProjects = async (page, size) => {
        try {
            const response = await getWithJWT(`${API_CONFIG.projects.project}?page=${page}&size=${size}`, [HttpStatus.OK]);
            setProjects(response.content);
            setTotalElements(response.totalElements);
        }
        catch (err) {
            console.error('Failed to fetch projects:', err);
        }
    };
    useEffect(() => {
        fetchProjects(page, rowsPerPage);
    }, [page, rowsPerPage, reloadTrigger]);
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setRowsPerPage(newSize);
        setPage(0); // reset to first page
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Paper, { sx: { width: '100%', overflow: 'hidden', mt: 2, p: 2 }, children: [_jsx(Typography, { variant: "h5", gutterBottom: true, children: "My Projects" }), _jsx(TableContainer, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "S.No" }), _jsx(TableCell, { children: "Title" }), _jsx(TableCell, { children: "Description" }), _jsx(TableCell, { children: "Overview" }), _jsx(TableCell, { children: "URL" }), _jsx(TableCell, { children: "Action" })] }) }), _jsx(TableBody, { children: projects.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, align: "center", children: "No projects available." }) })) : (projects.map((project, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: page * rowsPerPage + index + 1 }), _jsx(TableCell, { children: _jsx(Typography, { variant: "body1", color: "primary", sx: { cursor: 'pointer', textDecoration: 'underline' }, onClick: () => handlePreview(project.id), children: project.title }) }), _jsx(TableCell, { children: project.description }), _jsx(TableCell, { children: _jsx("div", { dangerouslySetInnerHTML: { __html: project.overview } }) }), _jsx(TableCell, { children: _jsx("a", { href: project.url, target: "_blank", rel: "noopener noreferrer", children: project.url }) }), _jsxs(TableCell, { children: [_jsx(IconButton, { color: "primary", onClick: () => { }, children: _jsx(Edit, {}) }), _jsx(IconButton, { color: "error", onClick: () => handleDelete(index), children: _jsx(Delete, {}) })] })] }, project.id)))) })] }) }), projects.length > 0 && (_jsx(TablePagination, { component: "div", count: totalElements, page: page, onPageChange: handleChangePage, rowsPerPage: rowsPerPage, onRowsPerPageChange: handleChangeRowsPerPage, rowsPerPageOptions: [5, 10, 25] }))] }), _jsx(ProjectPreviewDialog, { open: isPreviewOpen, project: previewProject, onClose: () => setIsPreviewOpen(false) })] }));
};
export default ProjectTable;
