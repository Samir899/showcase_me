package com.techverge.server.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    public ResponseEntity<?> getUser(){
        return ResponseEntity.status(HttpStatus.OK).body("GET USERS");
    }
}
