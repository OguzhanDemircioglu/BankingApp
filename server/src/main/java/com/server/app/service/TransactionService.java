package com.server.app.service;

import com.server.app.dto.TransactionHistory;
import com.server.app.model.Transaction;

import java.util.List;
import java.util.Map;

public interface TransactionService {
    List<TransactionHistory> getAllTransactionsByUsername(String userId);

    Transaction save(Map<String, String> map);
}
