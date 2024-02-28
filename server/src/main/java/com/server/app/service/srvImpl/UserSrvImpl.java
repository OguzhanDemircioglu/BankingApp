package com.server.app.service.srvImpl;

import com.server.app.model.User;
import com.server.app.repository.UserRepository;
import com.server.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserSrvImpl implements UserService {
    private final UserRepository repository;

    @Override
    public Optional<User> findUserByUsername(String username) {
        return repository.findUserByUsername(username);
    }

    @Override
    public void deleteUserByUsername(String username) {
        repository.deleteUserByUsername(username);
    }

    @Override
    public UserDetailsService userDetailsService() {
        return username -> repository.findUserByUsername(username).orElseThrow(()-> new UsernameNotFoundException(username));
    }

}
