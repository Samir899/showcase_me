package com.techverge.server.jwt;

public record LoginResponse(String fullName, String username, String[] roles, String token)  {
}
