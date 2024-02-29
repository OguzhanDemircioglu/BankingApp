package com.server.app.service;

import com.server.app.dto.AccountDto;
import com.server.app.model.Account;

import java.util.List;
import java.util.Map;

public interface AccountService {
    List<Account> findAllAccounts();

    List<AccountDto> getAccountsByUsername(String username);

    Account save(Map<String, String> map);

    void deleteAccountByNumber(String number);

    Account updateAccount(Map<String, String> map);

    Account getAccountByNumber(String number);
}
