package com.server.app.service.srvImpl;

import com.server.app.repository.UserRepository;
import com.server.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserSrvImpl implements UserService {
    private final UserRepository repository;

}
