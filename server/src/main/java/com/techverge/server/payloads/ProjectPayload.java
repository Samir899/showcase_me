package com.techverge.server.payloads;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
public class ProjectPayload {

    private String title;
    private String description;
    private String projectUrl;
    private String overview; // Consider sending this as plain string or HTML

    private List<String> tools;

    private List<MultipartFile> images;
}
