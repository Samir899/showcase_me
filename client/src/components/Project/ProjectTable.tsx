import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';
import {deleteWithJWT, getWithJWT} from '../../util/api/Api';
import {API_CONFIG} from '../../api-config';
import ProjectPreviewDialog from './ProjectPreviewDialog';
import {HttpStatus} from "../../util/api/HttpStatus";

type Project = {
    id: number;
    title: string;
    description: string;
    overview: string;
    url: string;
    tools: string[];
    images: string[];
};

type PaginatedResponse<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
};
type ProjectTableProps = {
    reloadTrigger: number;  // <-- receive reload trigger from parent
};
const ProjectTable: React.FC<ProjectTableProps> = ({reloadTrigger}) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [page, setPage] = useState(0); // 0-indexed
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalElements, setTotalElements] = useState(0);
    const [previewProject, setPreviewProject] = useState<Project | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const handlePreview = async (projectId: number) => {
        try {
            const project = await getWithJWT<Project>(
                `${API_CONFIG.projects.project}/${projectId}`,
                [HttpStatus.OK]
            );
            setPreviewProject(project);
            setIsPreviewOpen(true);
        } catch (error) {
            console.error('Failed to fetch project details:', error);
            Swal.fire('Error', 'Could not load project preview.', 'error');
        }
    };
    const handleDelete = async (projectIndex: number) => {

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
            } catch (error) {
                console.error('Failed to delete project:', error);
                Swal.fire('Error', 'Could not delete the project.', 'error');
            }
        }
    };

    const fetchProjects = async (page: number, size: number) => {
        try {
            const response = await getWithJWT<PaginatedResponse<Project>>(
                `${API_CONFIG.projects.project}?page=${page}&size=${size}`,
                [HttpStatus.OK]);
            setProjects(response.content);
            setTotalElements(response.totalElements);
        } catch (err) {
            console.error('Failed to fetch projects:', err);
        }
    };

    useEffect(() => {
        fetchProjects(page, rowsPerPage);
    }, [page, rowsPerPage, reloadTrigger]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value, 10);
        setRowsPerPage(newSize);
        setPage(0); // reset to first page
    };

    return (
        <>
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2, p: 2 }}>
            <Typography variant="h5" gutterBottom>
                My Projects
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Overview</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No projects available.
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project, index) => (
                                <TableRow key={project.id}>
                                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body1"
                                            color="primary"
                                            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                            onClick={() => handlePreview(project.id)}
                                        >
                                            {project.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{project.description}</TableCell>
                                    <TableCell>
                                        <div dangerouslySetInnerHTML={{ __html: project.overview }} />
                                    </TableCell>
                                    <TableCell>
                                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                                            {project.url}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => {/* Edit logic */}}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(index)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>

                </Table>
            </TableContainer>

            {projects.length > 0 && (
            <TablePagination
                component="div"
                count={totalElements}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
            )}
        </Paper>
        <ProjectPreviewDialog
            open={isPreviewOpen}
            project={previewProject}
            onClose={() => setIsPreviewOpen(false)}
        />
    </>
    );
};

export default ProjectTable;
