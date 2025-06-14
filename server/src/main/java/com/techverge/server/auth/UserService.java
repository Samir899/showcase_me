package com.techverge.server.auth;

import com.techverge.server.exceptions.EntityNotFoundException;
import com.techverge.server.payloads.UserPayload;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findByEmail(String email){
        Optional<User> userOptional = repository.findByEmail(email);
        if(userOptional.isEmpty()){
            throw new EntityNotFoundException(String.format("User with email: %s does not exist", email));
        }
        return userOptional.get();
    }

    public boolean isEmailExist(String email){
        Optional<User> optionalUser = repository.findByEmail(email);
        return optionalUser.isPresent();
    }

    public void create(UserPayload payload){
        User user = User.builder()
                .firstName(payload.getFirstName())
                .lastName(payload.getLastName())
                .email(payload.getEmail())
                .password(passwordEncoder.encode(payload.getPassword()))
                .role(new Role(2))
                .isActive(false)
                .build();
        repository.save(user);
    }
}
