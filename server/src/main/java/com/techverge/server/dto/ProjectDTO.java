package com.techverge.server.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {

    private int id;
    private String title;
    private String description;
    private String overview;
    private String url;
    private List<String> tools;
    private List<String> images;
}
