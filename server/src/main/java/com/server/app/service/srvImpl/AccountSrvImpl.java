package com.server.app.service.srvImpl;

import com.server.app.dto.AccountDto;
import com.server.app.model.Account;
import com.server.app.repository.AccountRepository;
import com.server.app.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountSrvImpl implements AccountService {
    private final AccountRepository repository;

    @Override
    public List<Account> findAllAccounts() {
        return repository.findAll();
    }

    @Override
    public List<AccountDto> getAccountsByUserUsername(String username) {
        return repository.getAccountsByUserUsername(username);
    }

    @Override
    public Account save(Map<String, String> map) {
        return repository.save(new Account());
    }

    @Override
    public void deleteAccountByNumber(String number) {
        repository.deleteAccountByNumber(number);
    }
}
