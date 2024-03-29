package com.server.app.repository;

import com.server.app.dto.AccountDto;
import com.server.app.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    @Query("Select new com.server.app.dto.AccountDto (" +
            "e.id,e.user.username,e.number, e.name,e.balance, e.createdAt, e.updatedAt) " +
            "from Account e " +
            "order by e.createdAt desc ")
    List<AccountDto> getAllAccounts();

    void deleteAccountByNumber(String number);

    Optional<Account> getAccountByNumber(String number);

    Optional<Account> getAccountById(String id);
}
