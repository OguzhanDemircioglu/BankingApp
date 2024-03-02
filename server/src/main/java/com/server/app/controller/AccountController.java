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

    @PostMapping(value = "/getAllAccounts")
    public ResponseEntity<?> getAllAccounts() throws Exception {
        try {
            return ResponseEntity.ok(service.getAllAccounts());
        } catch (Exception e) {
            throw new Exception("işlem geçersiz");
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> save(@RequestBody Map<String, String> map) throws Exception {
        try {
            return ResponseEntity.ok(service.save(map));
        } catch (RuntimeException e) {
            throw new Exception(e.getMessage());
        }catch (Exception e) {
            throw new Exception("işlem geçersiz");
        }
    }

    @Transactional
    @DeleteMapping(value = "/deleteAccountByNumber/{number}")
    public ResponseEntity<?> deleteAccountByNumber(@PathVariable String number) {
        try {
            service.deleteAccountByNumber(number);
            return ResponseEntity.ok().body("Kayıt Silindi");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("İşlem geçersiz");
        }
    }

    @PutMapping(value = "/updateAccount")
    public ResponseEntity<?> updateAccount(@RequestBody Map<String, String> map) throws Exception {
        try {
            service.updateAccount(map);
            return ResponseEntity.ok().body("Kayıt Update Edildi");
        } catch (RuntimeException e) {
            throw new Exception(e.getMessage());
        } catch (Exception e) {
            throw new Exception("işlem geçersiz");
        }
    }

    @GetMapping(value = "/getAccountByNumber/{number}")
    public ResponseEntity<?> getAccountByNumber(@PathVariable String number) throws Exception {
        try {
            return ResponseEntity.ok(service.getAccountByNumber(number));
        } catch (RuntimeException e) {
            throw new Exception(e.getMessage());
        } catch (Exception e) {
            throw new Exception("işlem geçersiz");
        }
    }
}
