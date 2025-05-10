package com.techverge.server.unit;

import com.techverge.server.auth.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class UserServiceTests {
    @Autowired
    UserService userService;

    @Test
    void testSomething() {
        assertEquals(5, userService.add(2, 3));
    }
}
