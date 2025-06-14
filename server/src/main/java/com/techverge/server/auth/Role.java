package com.techverge.server.auth;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Table(name="roles")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = {"roleId", "roleName"})
public class Role {

    public Role(int roleId){
        this.roleId=roleId;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roleId;
    @Column(nullable = false, unique = true)
    private String roleName;
    private String roleDescription;

}
