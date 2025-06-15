package com.techverge.server.unit;

import com.techverge.server.auth.User;
import com.techverge.server.auth.UserRepository;
import com.techverge.server.auth.UserService;
import com.techverge.server.exceptions.EntityNotFoundException;
import com.techverge.server.payloads.UserPayload;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserRepository userRepository;
    private UserService userService;
    private PasswordEncoder passwordEncoder;


    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        userService = new UserService(userRepository, passwordEncoder);
    }

    @Test
    @DisplayName("Returns User Object when user is present with given email")
    void findByEmail_shouldReturnUser_whenUserExists() {
        // Arrange
        String email = "john@example.com";
        User mockUser = User.builder()
                .id(new UUID().getMostSignificantBits())
                .email(email)
                .firstName("John")
                .lastName("Doe")
                .build();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));

        // Act
        User result = userService.findByEmail(email);

        // Assert
        assertEquals(mockUser, result);
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    @DisplayName("Throws Exception when user is not present with given email")
    void findByEmail_shouldThrowException_whenUserDoesNotExist() {
        // Arrange
        String email = "missing@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException thrown = assertThrows(
                EntityNotFoundException.class,
                () -> userService.findByEmail(email)
        );

        assertEquals("User with email: missing@example.com does not exist", thrown.getMessage());
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    @DisplayName("Returns false when user is not present with given email")
    void isEmailExist_shouldReturnFalse_whenUserWithEmailDoesNotExist(){
        //Arrange
        String email = "john@example.com";
        //Act
        boolean result = userService.isEmailExist(email);
        //Assert
        assertFalse(result);
    }

    @Test
    @DisplayName("Returns true when user is present with given email")
    void isEmailExist_shouldReturnTrue_whenUserWithEmailExist(){

        //Arrange
        String email = "john@example.com";
        User mockUser = User.builder()
                .id(new UUID().getMostSignificantBits())
                .email(email)
                .firstName("John")
                .lastName("Doe")
                .build();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));

        //Act
        boolean result = userService.isEmailExist(email);

        //Assert
        assertTrue(result);
    }

    @Test
    @DisplayName("Verify User saved")
    void create_shouldSaveUserWithGivenPayload(){

        //Arrange
        UserPayload payload = UserPayload.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john@gmail.com")
                .password("password")
                .confirmPassword("password")
                .build();

        //Act
        userService.create(payload);

        //Assert
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository, times(1)).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();
        assertEquals("John", savedUser.getFirstName());
        assertEquals("Doe", savedUser.getLastName());
        assertEquals("john@gmail.com", savedUser.getEmail());
        assertEquals("password", savedUser.getPassword());
        assertFalse(savedUser.isActive());  // default isActive to false
    }
}
