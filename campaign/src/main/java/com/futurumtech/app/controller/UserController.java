package com.futurumtech.app.controller;

import com.futurumtech.app.repository.UserRepository;
import com.futurumtech.app.service.UserService;
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
    public ResponseEntity<?> updateBalance(@RequestParam("userId") Long userId, @RequestParam("newBalance") int newBalance) {
        userService.updateBalance(userId, newBalance);

        return ResponseEntity.ok("User balance updated successfully!");
    }
}
