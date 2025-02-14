package com.futurumtech.app.controller;

import com.futurumtech.app.service.UserService;
import lombok.AllArgsConstructor;
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

}
