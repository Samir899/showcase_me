package com.techverge.server.project;

import com.techverge.server.dto.ProjectDTO;
import com.techverge.server.dto.ProjectPaginationResponse;
import com.techverge.server.http.SuccessResponse;
import com.techverge.server.jwt.CustomUserPrincipal;
import com.techverge.server.payloads.PaginationRequest;
import com.techverge.server.payloads.ProjectPayload;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }
    @PostMapping(value = "/projects", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SuccessResponse> createProject(@ModelAttribute ProjectPayload payload) {
        projectService.saveProject(payload);
        return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponse("Project Created Successfully"));
    }

    @GetMapping("/projects")
    public ResponseEntity<ProjectPaginationResponse> getAllProjects(@ModelAttribute PaginationRequest paginationRequest) {
        ProjectPaginationResponse projects = projectService.getAllProjects(paginationRequest);
        return ResponseEntity.ok(projects);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<SuccessResponse> deleteProject(@PathVariable int id) {
        log.info("Deleting project with ID: {}", id);
        projectService.deleteProject(id);
        return ResponseEntity.ok(new SuccessResponse("Project Deleted Successfully"));
    }

//    @PutMapping("/projects")
//    public ResponseEntity<SuccessResponse> updateProject(@RequestBody ProjectPayload payload) {
//        projectService.updateProject(payload);
//        return ResponseEntity.ok(new SuccessResponse("Project Updated Successfully"));
//    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable int id) {
        ProjectDTO project = projectService.getProjectById(id);
        return ResponseEntity.ok(project);
    }
}
