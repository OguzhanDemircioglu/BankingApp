package com.server.app.service.srvImpl;

import com.server.app.repository.AccountRepository;
import com.server.app.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountSrvImpl implements AccountService {
    private final AccountRepository repository;
}
