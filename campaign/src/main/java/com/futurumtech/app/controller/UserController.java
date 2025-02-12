package com.futurumtech.app.controller;

import com.futurumtech.app.repository.UserRepository;
import com.futurumtech.app.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/balance")
    public int getBalance(@RequestParam("userId") Long userId) {
        return userService.getBalance(userId);
    }

    @PutMapping("/balance")
    public void updateBalance(@RequestParam("userId") Long userId, @RequestParam("newBalance") int newBalance) {
        userService.updateBalance(userId, newBalance);
    }
}
