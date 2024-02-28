package com.server.app.service;

import com.server.app.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByUsername(String username);
    void deleteUserByUsername(String userId);
    UserDetailsService userDetailsService();
}
