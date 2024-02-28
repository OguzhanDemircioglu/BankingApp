package com.server.app.controller;

import com.server.app.service.AccountService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService service;

    @PostMapping(value = "/findAllAccounts")
    public ResponseEntity<?> findAllAccounts() throws Exception {
        try {
            return ResponseEntity.ok(service.findAllAccounts());
        }catch (Exception e){
            throw new Exception("işlem geçersiz");
        }
    }

    @PostMapping(value = "/getAccountsByUserUsername/{username}")
    public ResponseEntity<?> getAccountsByUserUsername(@PathVariable String username) throws Exception {
        try {
            return ResponseEntity.ok(service.getAccountsByUserUsername(username));
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

    @Transactional
    @DeleteMapping(value = "/deleteAccountByNumber/{number}")
    public ResponseEntity<?> deleteAccountByNumber(@PathVariable String number){
        try {
            service.deleteAccountByNumber(number);
            return ResponseEntity.ok().body("Kayıt Silindi");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("İşlem geçersiz");
        }
    }
}
