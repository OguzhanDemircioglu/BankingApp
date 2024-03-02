package com.server.app.service.srvImpl;

import com.server.app.dto.AccountDto;
import com.server.app.model.Account;
import com.server.app.repository.AccountRepository;
import com.server.app.repository.UserRepository;
import com.server.app.service.AccountService;
import com.server.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountSrvImpl implements AccountService {
    private final AccountRepository repository;
    private final UserRepository userRepository;

    @Override
    public List<AccountDto> getAllAccounts() {
        return repository.getAllAccounts();
    }

    @Override
    public Account save(Map<String, String> map) {

        if (new BigDecimal(map.get("amount")).compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException("Yeni Bir hesabın içindeki miktar Sıfırın altında olamaz ");
        }

        repository.findAll().stream()
                .filter(i -> i.getNumber().equals(map.get("number")) || i.getName().equals(map.get("name")))
                .findFirst().ifPresent(i -> {
                    throw new RuntimeException("Bu numara veya İsimde zaten bir kayıt var");
                });

        return repository.save(
                Account.builder()
                        .user(userRepository.findUserByUsername(map.get("username"))
                                .orElseThrow(() -> new RuntimeException("Username kayıtlı değil")))
                        .name(map.get("name"))
                        .number(map.get("number"))
                        .balance(new BigDecimal(map.get("amount")))
                        .createdAt(LocalDateTime.now())
                        .build());
    }

    @Override
    public void deleteAccountByNumber(String number) {
        repository.deleteAccountByNumber(number);
    }

    @Override
    public void updateAccount(Map<String, String> map) {
        Account account = repository.getAccountById(map.get("accountId"))
                .orElseThrow(() -> new RuntimeException("Account tanımlı değil"));

        if (!map.get("name").isEmpty()) {
            account.setName(map.get("name"));
            account.setUpdatedAt(LocalDateTime.now());
        }

        if (!map.get("number").isEmpty()) {
            account.setNumber(map.get("number"));
            account.setUpdatedAt(LocalDateTime.now());
        }

        if (!map.get("amount").isEmpty()) {
            account.setBalance(new BigDecimal(map.get("amount")));
            account.setUpdatedAt(LocalDateTime.now());
        }
        repository.save(account);

    }

    @Override
    public Account getAccountByNumber(String number) {
        return repository.getAccountByNumber(number)
                .orElseThrow(() -> new RuntimeException("Account tanımlı değil"));
    }
}
