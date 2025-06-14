package com.techverge.server.payloads;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PaginationRequest {
    private int page=0;
    private int size=10;
}
