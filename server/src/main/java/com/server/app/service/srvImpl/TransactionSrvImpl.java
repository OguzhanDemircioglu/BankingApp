package com.server.app.service.srvImpl;

import com.server.app.repository.TransactionRepository;
import com.server.app.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransactionSrvImpl implements TransactionService {
    private final TransactionRepository repository;

}
