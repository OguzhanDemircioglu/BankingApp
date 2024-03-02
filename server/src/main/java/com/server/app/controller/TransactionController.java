package com.server.app.controller;

import com.server.app.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService service;

    @PostMapping(value = "/getAllTransactions")
    public ResponseEntity<?> getAllTransactionsByUsername() throws Exception {
        try {
            return ResponseEntity.ok(service.getAllTransactionsByUsername());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(e.getMessage());
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new Exception("işlem geçersiz");
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody Map<String, String> map) throws Exception {
        try {
            return ResponseEntity.ok(service.save(map));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(e.getMessage());
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        } catch (Exception e) {
            throw new Exception("işlem geçersiz");
        }
    }
}
