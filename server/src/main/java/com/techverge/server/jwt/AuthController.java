package com.techverge.server.jwt;

import com.techverge.server.auth.UserService;
import com.techverge.server.http.SuccessResponse;
import com.techverge.server.jwt.JwtUtil;
import com.techverge.server.payloads.UserPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService service;

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody AuthRequest request) {
        UsernamePasswordAuthenticationToken authInput =
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        authManager.authenticate(authInput);

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String[] roles = userDetails.getAuthorities()
                .stream()
                .map(authority -> authority.getAuthority())
                .toArray(String[]::new);

        String token = jwtUtil.generateToken(userDetails.getUsername(), roles);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new LoginResponse(userDetails.getUsername(), userDetails.getUsername(), roles, token));
    }
    @PostMapping("/auth/signup")
    public ResponseEntity<?> signup(@RequestBody UserPayload payload){
        service.create(payload);
        return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponse("Signup Success"));
    }
}

