package com.server.app.model;

import com.server.app.model.enums.Operation;
import com.server.app.model.enums.Status;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @SequenceGenerator(name = "seq_note", allocationSize = 1)
    @GeneratedValue(generator = "seq_note", strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_account_id", nullable = false, updatable = false)
    private Account fromAccountId;

    @ManyToOne
    @JoinColumn(name = "to_account_id", updatable = false)
    private Account toAccountId;

    @Column(name = "amount", nullable = false, updatable = false)
    private BigDecimal amount;

    @Column(name = "transaction_date", updatable = false)
    private LocalDateTime transactionDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "operation")
    private Operation operation;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;
}
