package com.futurumtech.app.service;

import com.futurumtech.app.DTO.UpdateBalanceRequest;
import com.futurumtech.app.model.User;
import com.futurumtech.app.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User does not exist!"));
    }

    public int getBalance(Long userId) {
        User user = getUser(userId);
        return user.getBalance();
    }

    public void updateBalance(UpdateBalanceRequest updateBalanceRequest) {
        User user = getUser(updateBalanceRequest.getUserId());

        user.setBalance(updateBalanceRequest.getNewBalance());
        userRepository.save(user);
    }
}
