package com.archana.ai_dashboard.service;

import com.archana.ai_dashboard.dto.LoginRequest;
import com.archana.ai_dashboard.dto.UserDTO;
import com.archana.ai_dashboard.entity.User;
import com.archana.ai_dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.archana.ai_dashboard.dto.AuthResponse;
import com.archana.ai_dashboard.security.JwtService;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private javax.sql.DataSource dataSource;

    // Register User
    public UserDTO registerUser(UserDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()) != null) {
            throw new RuntimeException("Email already exists!");
        }

        User user = convertToEntity(dto);

        // Encrypt password
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        User savedUser = userRepository.save(user);

        return convertToDTO(savedUser);
    }

    // Get All Users
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    // Get User By Id
    public UserDTO getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return convertToDTO(user);
    }

    // Update User
    public User updateUser(Long id, User updatedUser) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(updatedUser.getFullName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        user.setRole(updatedUser.getRole());

        return userRepository.save(user);
    }

    // Delete User
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Login
    public AuthResponse loginUser(LoginRequest loginRequest) {

        System.out.println("=================================");
        System.out.println("Email Received = " + loginRequest.getEmail());
        System.out.println(userRepository.findAll());
        System.out.println(userRepository.count());

        User user = userRepository.findByEmail(loginRequest.getEmail());

        System.out.println("User Found = " + user);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(token);
    }
    // Entity -> DTO
    private UserDTO convertToDTO(User user) {

        return new UserDTO(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole()
        );
    }

    // DTO -> Entity
    private User convertToEntity(UserDTO dto) {

        User user = new User();

        user.setId(dto.getId());
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRole("USER");

        return user;
    }
}