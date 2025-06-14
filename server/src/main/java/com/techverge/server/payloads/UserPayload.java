package com.techverge.server.payloads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserPayload {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String confirmPassword;
}
