package com.techverge.server.project;

import com.techverge.server.auth.User;
import com.techverge.server.dto.ProjectDTO;
import com.techverge.server.dto.ProjectPaginationResponse;
import com.techverge.server.exceptions.ResourceNotFoundException;
import com.techverge.server.jwt.CustomUserPrincipal;
import com.techverge.server.payloads.PaginationRequest;
import com.techverge.server.payloads.ProjectPayload;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Optional<Project> findProjectById(int id) {
        return projectRepository.findById(id);
    }

    public void saveProject(ProjectPayload payload) {
        UUID userId = getPrincipal().getId();
        User user = new User(userId);
        List<Tool> tools = payload.getTools()
                .stream()
                .map(tool -> Tool.builder()
                        .name(tool)
                        .build())
                .toList();
        Project project = Project.builder()
                .user(user)
                .title(payload.getTitle())
                .description(payload.getDescription())
                .url(payload.getProjectUrl())
                .overview(payload.getOverview())
                .build();

        // Now set the project for each tool
        tools.forEach(tool -> tool.setProject(project));

        // Set tools on project
        project.setToolList(new HashSet<>(tools));

        // Handle image files saving & URL creation
        List<String> imageUrls = new ArrayList<>();
        List<MultipartFile> images = payload.getImages();
        if (images != null) {
            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    try {
                        String savedPath = saveImageToFileSystem(image, user.getId());
                        imageUrls.add(savedPath);
                    } catch (IOException e) {
                        log.error("Failed to save image file: " + image.getOriginalFilename(), e);
                    }
                }
            }
        }
        project.setImageList(new HashSet<>(imageUrls.stream().map(
                imageUrl-> Image.builder()
                        .url(imageUrl)
                        .project(project)
                        .build()
        ).toList()));

        // Save project (which will cascade-save tools if cascade is configured)
        projectRepository.save(project);
    }

//    public void updateProject(int id, ProjectPayload payload) {
//        Optional<Project> optionalProject = projectRepository.findById(id);
//        if (optionalProject.isPresent()) {
//            Project project = optionalProject.get();
//            project.setTitle(payload.getTitle());
//            project.setDescription(payload.getDescription());
//            project.setUrl(payload.getProjectUrl());
//            project.setOverview(payload.getOverview());
//
//            // Handle image files saving & URL creation
//            List<String> imageUrls = new ArrayList<>();
//            List<MultipartFile> images = payload.getImages();
//            if (images != null) {
//                for (MultipartFile image : images) {
//                    if (!image.isEmpty()) {
//                        try {
//                            String savedPath = saveImageToFileSystem(image, project.getUserId());
//                            imageUrls.add(savedPath);
//                        } catch (IOException e) {
//                            log.error("Failed to save image file: " + image.getOriginalFilename(), e);
//                        }
//                    }
//                }
//            }
//            project.setImageList(new HashSet<>(imageUrls.stream().map(
//                    imageUrl-> Image.builder()
//                            .url(imageUrl)
//                            .project(project)
//                            .build()
//            ).toList()));
//
//            // Save updated project
//            projectRepository.save(project);
//        }
//    }

    public void deleteProject(int id) throws SecurityException, NoSuchElementException{
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Project with ID " + id + " not found"));

        if(!project.getUser().getId().equals(getPrincipal().getId())){
            throw new SecurityException("You do not have permission to delete this project");
        }
        projectRepository.delete(project);
    }

    private String saveImageToFileSystem(MultipartFile image, UUID userId) throws IOException {
        // Create uploads dir if doesn't exist
        String uploadsDir = "uploads/projects/" + userId + "/";
        File uploadDirFile = new File(uploadsDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        // Generate unique filename (e.g. UUID + original extension)
        String originalFilename = image.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFilename = UUID.randomUUID() + extension;

        // Save file to disk
        Path filePath = Paths.get(uploadsDir, uniqueFilename);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return relative URL or path you want to serve to clients
        return "/" + uploadsDir + uniqueFilename;
    }

    public ProjectDTO getProjectById(int id) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();

            // Convert Set<Tool> to List<String>
            List<String> toolNames = project.getToolsAsList();

            // Convert Set<Image> to List<String> of image URLs
            List<String> imageUrls = project.getImagesAsList();

            return ProjectDTO.builder()
                    .id(project.getId())
                    .title(project.getTitle())
                    .description(project.getDescription())
                    .overview(project.getOverview())
                    .url(project.getUrl())
                    .tools(toolNames)
                    .images(imageUrls)
                    .build();
        } else {
            // Handle the case when the project is not found
            throw new ResourceNotFoundException("Project not found with ID: " + id);
        }
    }

    public ProjectPaginationResponse getAllProjects(PaginationRequest paginationRequest) {
        Pageable pageable = PageRequest.of(
                paginationRequest.getPage()
                , paginationRequest.getSize()
                , Sort.by("id").descending());

        UUID userId = getPrincipal().getId();

        if (userId != null) {
            Page<Project> projectPage = projectRepository.findByUserId(userId, pageable);
            List<ProjectDTO> projectDTOS = projectPage.getContent().stream()
                    .map(project ->
                            ProjectDTO.builder()
                                    .id(project.getId())
                                    .title(project.getTitle())
                                    .description(project.getDescription())
                                    .overview(project.getOverview())
                                    .url(project.getUrl())
                                    .tools(project.getToolList()
                                            .stream()
                                            .map(Tool::getName)
                                            .toList())
                                    .build()

                    )
                    .toList();

            return ProjectPaginationResponse
                    .builder()
                    .content(projectDTOS)
                    .totalPages(projectPage.getTotalPages())
                    .totalElements(projectPage.getTotalElements())
                    .number(projectPage.getNumber())
                    .build();
            }
        return null;
    }

    private CustomUserPrincipal getPrincipal(){
        return (CustomUserPrincipal) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }
}
