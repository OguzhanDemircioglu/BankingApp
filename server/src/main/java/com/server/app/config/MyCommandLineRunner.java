package com.server.app.config;

import com.server.app.model.enums.Operation;
import com.server.app.model.enums.Status;
import com.server.app.model.Account;
import com.server.app.model.Transaction;
import com.server.app.model.User;
import com.server.app.repository.AccountRepository;
import com.server.app.repository.TransactionRepository;
import com.server.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class MyCommandLineRunner implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public void run(String... args) {

        User admin = User.builder().username("admin")
                .password(new BCryptPasswordEncoder().encode("admin"))
                .email("admin@admin.com")
                .createdAt(LocalDateTime.now()).build();
        userRepository.save(admin);

        User oguz = User.builder().username("oguz")
                .password(new BCryptPasswordEncoder().encode("oguz"))
                .email("ogz@gamil.com")
                .createdAt(LocalDateTime.now()).build();
        userRepository.save(oguz);

        User mila = User.builder().username("mila")
                .password(new BCryptPasswordEncoder().encode("mila"))
                .email("mila@yahoo.com")
                .createdAt(LocalDateTime.now()).build();
        userRepository.save(mila);

        Account oguzHesap = Account.builder().name("isBankAnkara").number("1234121245151").balance(BigDecimal.valueOf(10000))
                .user(oguz).createdAt(LocalDateTime.now()).build();
        accountRepository.save(oguzHesap);

        Account milaHesap = Account.builder().name("isBankAntalya").number("7890870766961").balance(BigDecimal.valueOf(3000))
                .user(mila).createdAt(LocalDateTime.now()).build();
        accountRepository.save(milaHesap);

        Transaction transaction1 = Transaction.builder().fromAccountId(oguzHesap).toAccountId(milaHesap)
                .amount(BigDecimal.valueOf(100)).status(Status.SUCCESS).operation(Operation.TRANSFER)
                .transactionDate(LocalDateTime.now()).build();
        transactionRepository.save(transaction1);

        Transaction transaction2 = Transaction.builder().fromAccountId(oguzHesap).toAccountId(null)
                .amount(BigDecimal.valueOf(100)).status(Status.SUCCESS).operation(Operation.WITHDRAWAL)
                .transactionDate(LocalDateTime.now()).build();
        transactionRepository.save(transaction2);

    }
}