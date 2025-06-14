package com.techverge.server.project;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    Page<Project> findByUserId(UUID userId, Pageable pageable);
}
