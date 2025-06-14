package com.techverge.server.http;

import lombok.Builder;

public record ErrorResponse(String error, String message) {
}
