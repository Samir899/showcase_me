package com.techverge.server.auth;

import com.techverge.server.http.SuccessResponse;
import com.techverge.server.payloads.UserPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

//    private final UserService service;
//
//    @Autowired
//    public LoginController(UserService service){
//        this.service = service;
//    }
//
//    @PostMapping("/auth/signup")
//    public ResponseEntity<?> signup(@RequestBody UserPayload payload){
//        service.create(payload);
//        return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponse("Signup Success"));
//    }
}
