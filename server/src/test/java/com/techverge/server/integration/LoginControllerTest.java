//package com.techverge.server.integration;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.techverge.server.auth.LoginController;
//import com.techverge.server.auth.UserService;
//import com.techverge.server.payloads.UserPayload;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.TestConfiguration;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Import;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import static org.mockito.Mockito.doNothing;
//import static org.mockito.Mockito.mock;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//
//@ActiveProfiles("test")
////@WebMvcTest(LoginController.class)
//@SpringBootTest
//@AutoConfigureMockMvc
//@Import(LoginControllerTest.MockedServiceConfig.class)
//class LoginControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Autowired
//    private UserService userService;
//
//    @Test
//    void signup_ShouldReturnCreated_WhenPayloadIsValid() throws Exception {
//        UserPayload payload = UserPayload.builder()
//                .firstName("John")
//                .lastName("Doe")
//                .email("john.doe@example.com")
//                .password("password")
//                .confirmPassword("password")
//                .build();
//
//        doNothing().when(userService).create(payload);
//
//        mockMvc.perform(post("/signup")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(payload)))
//                .andExpect(status().isCreated())
//                .andExpect(content().string("success"));
//    }
//
//    @TestConfiguration
//    static class MockedServiceConfig {
//        @Bean
//        public UserService userService() {
//            return mock(UserService.class);
//        }
//    }
//}
