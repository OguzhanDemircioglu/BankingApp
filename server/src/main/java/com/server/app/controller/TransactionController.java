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

    @PostMapping(value = "/getAllTransactionsByUsername/{username}")
    public ResponseEntity<?> getAllTransactionsByUsername(@PathVariable String username) throws Exception {
        try {
            return ResponseEntity.ok(service.getAllTransactionsByUsername(username));
        }catch (Exception e){
            throw new Exception("işlem geçersiz");
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody Map<String,String> map) throws Exception {
        try {
            return ResponseEntity.ok(service.save(map));
        }catch (Exception e){
            throw new Exception("işlem geçersiz");
        }
    }
}
