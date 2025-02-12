package com.futurumtech.app.controller;

import com.futurumtech.app.DTO.UpdateBalanceRequest;
import com.futurumtech.app.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/balance")
    public int getBalance(@RequestParam("userId") Long userId) {
        return userService.getBalance(userId);
    }

    @PutMapping("/balance")
    public ResponseEntity<?> updateBalance(@Valid @RequestBody UpdateBalanceRequest updateBalanceRequest) {
        userService.updateBalance(updateBalanceRequest);
        return ResponseEntity.ok("User balance updated successfully!");
    }
}
