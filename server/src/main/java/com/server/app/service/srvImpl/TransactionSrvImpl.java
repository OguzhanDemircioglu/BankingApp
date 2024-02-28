package com.server.app.service.srvImpl;

import com.server.app.dto.TransactionHistory;
import com.server.app.model.Transaction;
import com.server.app.repository.TransactionRepository;
import com.server.app.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TransactionSrvImpl implements TransactionService {
    private final TransactionRepository repository;

    @Override
    public List<TransactionHistory> getAllTransactionsByUsername(String userId) {
        return repository.getAllTransactionsByUsername(userId);
    }

    @Override
    public Transaction save(Map<String, String> map) {
        return repository.save(new Transaction());
    }
}
