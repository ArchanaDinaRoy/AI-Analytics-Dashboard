package com.archana.ai_dashboard.controller;

import com.archana.ai_dashboard.entity.User;
import com.archana.ai_dashboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.archana.ai_dashboard.dto.UserDTO;
import com.archana.ai_dashboard.dto.LoginRequest;
import com.archana.ai_dashboard.dto.AuthResponse;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController  {

    @Autowired
    private UserService userService;

    @PostMapping
    public UserDTO registerUser(@RequestBody UserDTO userDTO) {
        return userService.registerUser(userDTO);
    }
    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody LoginRequest loginRequest) {

        System.out.println("USER CONTROLLER LOGIN CALLED");

        return userService.loginUser(loginRequest);
    }


    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id,
                           @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully!";
    }

}
