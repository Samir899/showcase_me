package com.techverge.server.project;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tools")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Tool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

}
