package com.server.app.dto;

import com.server.app.constant.Operation;
import com.server.app.constant.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistory {
    private Long transactionId;
    private String fromUsername;
    private String fromAccountNumber;
    private Operation operationType;
    private BigDecimal amount;
    private String toUsername;
    private String toAccountNumber;
    private LocalDateTime transactionDate;
    private Status transactionStatus;
}
