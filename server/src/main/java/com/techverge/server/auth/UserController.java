package com.techverge.server.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/api/users")
    public ResponseEntity<?> getUser(){
        return ResponseEntity.status(HttpStatus.OK).body("GET USERS");
    }
}
