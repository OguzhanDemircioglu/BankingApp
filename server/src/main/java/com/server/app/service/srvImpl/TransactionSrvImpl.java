package com.server.app.service.srvImpl;

import com.server.app.dto.TransactionHistory;
import com.server.app.model.Account;
import com.server.app.model.Transaction;
import com.server.app.model.enums.Operation;
import com.server.app.model.enums.Status;
import com.server.app.repository.AccountRepository;
import com.server.app.repository.TransactionRepository;
import com.server.app.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TransactionSrvImpl implements TransactionService {
    private final TransactionRepository repository;
    private final AccountRepository accountRepository;

    @Override
    public List<TransactionHistory> getAllTransactionsByUsername() {
        return repository.getAllTransactionsByUsername();
    }

    @Override
    public Transaction save(Map<String, String> map) {

        String operationType = map.get("operationType");
        BigDecimal trasactionAmount = new BigDecimal(map.get("amount"));

        if (operationType.isEmpty()) {
            throw new RuntimeException("Operasyon Tipi Boş olamaz");
        }

        Account fromAccount = accountRepository.getAccountByNumber(map.get("fromAccountNumber"))
                .orElseThrow(() -> new IllegalArgumentException("Gönderen Account Tanımlı değil"));

        Account toAccount;
        if(map.get("toAccountNumber").isEmpty()){
            toAccount = fromAccount;
        }else {
            toAccount = accountRepository.getAccountByNumber(map.get("toAccountNumber"))
                    .orElseThrow(() -> new IllegalArgumentException("Alıcı Account Tanımlı değil"));
        }

        if (trasactionAmount.compareTo(BigDecimal.ZERO) <= 0) {
            return repository.save(
                    Transaction.builder()
                            .fromAccountId(fromAccount)
                            .toAccountId(toAccount)
                            .operation(Operation.valueOf(operationType))
                            .amount(trasactionAmount)
                            .status(Status.FAIL)
                            .transactionDate(LocalDateTime.now())
                            .build());
        }

        BigDecimal addition = new BigDecimal(fromAccount.getBalance().longValue() + trasactionAmount.longValue());
        BigDecimal extraction = new BigDecimal(fromAccount.getBalance().longValue() - trasactionAmount.longValue());

        if (!operationType.equals("DEPOSIT") && extraction.longValue() < 0) {
            return repository.save(
                    Transaction.builder()
                            .fromAccountId(fromAccount)
                            .toAccountId(toAccount)
                            .operation(Operation.valueOf(operationType))
                            .amount(trasactionAmount)
                            .status(Status.FAIL)
                            .transactionDate(LocalDateTime.now())
                            .build());
        }

        switch (operationType) {
            case "WITHDRAWAL" , "DEPOSIT":

                fromAccount.setBalance(operationType.equals("WITHDRAWAL") ? extraction: addition);
                fromAccount.setUpdatedAt(LocalDateTime.now());
                accountRepository.save(fromAccount);

                return repository.save(
                        Transaction.builder()
                                .fromAccountId(fromAccount)
                                .toAccountId(toAccount)
                                .operation(Operation.valueOf(operationType))
                                .amount(trasactionAmount)
                                .status(Status.SUCCESS)
                                .transactionDate(LocalDateTime.now())
                                .build());
            case "TRANSFER", "PAYMENT":

                fromAccount.setBalance(extraction);
                fromAccount.setUpdatedAt(LocalDateTime.now());
                accountRepository.save(fromAccount);

                toAccount.setBalance(addition);
                toAccount.setUpdatedAt(LocalDateTime.now());
                accountRepository.save(toAccount);

                return repository.save(
                        Transaction.builder()
                                .fromAccountId(fromAccount)
                                .toAccountId(toAccount)
                                .operation(Operation.valueOf(operationType))
                                .amount(trasactionAmount)
                                .status(Status.SUCCESS)
                                .transactionDate(LocalDateTime.now())
                                .build());
            default:
                throw new RuntimeException("Geçersiz Operasyon Tipi");
        }
    }
}
