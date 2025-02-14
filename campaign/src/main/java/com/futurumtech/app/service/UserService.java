package com.futurumtech.app.service;

import com.futurumtech.app.model.Campaign;
import com.futurumtech.app.model.User;
import com.futurumtech.app.repository.CampaignRepository;
import com.futurumtech.app.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CampaignRepository campaignRepository;

    private User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User does not exist!"));
    }

    public int getBalance(Long userId) {
        User user = getUser(userId);
        return user.getBalance();
    }

    public void updateBalance(Long userId) {
        User user = getUser(userId);
        int result = campaignRepository.findAll()
                .stream()
                .mapToInt(Campaign::getFund)
                .sum();

        if(result > 1000) {
            throw new IllegalArgumentException("You dont have enough money!");
        }

        user.setBalance(1000 - result);
        userRepository.save(user);
    }
}
