package com.server.app.repository;

import com.server.app.dto.TransactionHistory;
import com.server.app.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    @Query("Select new com.server.app.dto.TransactionHistory (e.id, " +
            "e.fromAccountId.user.username, e.fromAccountId.number, " +
            "e.operation, e.amount, " +
            "e.toAccountId.user.username, e.toAccountId.number, " +
            "e.transactionDate, e.status )" +
            "from Transaction e " +
            "where e.fromAccountId.user.username = :username or e.toAccountId.user.username = :username " +
            "order by e.transactionDate desc ")
    List<TransactionHistory> getAllTransactionsByUsername(@Param("username") String username);
}
