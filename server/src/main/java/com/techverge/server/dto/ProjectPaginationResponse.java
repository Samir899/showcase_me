package com.techverge.server.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class ProjectPaginationResponse {

    private List<ProjectDTO> content;
    private int totalPages;
    private long totalElements;
    private int number;
}
