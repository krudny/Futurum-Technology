package com.futurumtech.app.service;

import com.futurumtech.app.model.Campaign;
import com.futurumtech.app.model.User;
import com.futurumtech.app.repository.CampaignRepository;
import com.futurumtech.app.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserRepository userRepository;
    private CampaignRepository campaignRepository;
    private UserService userService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        campaignRepository = mock(CampaignRepository.class);
        userService = new UserService(userRepository, campaignRepository);
    }

    @Test
    void getBalance_ShouldReturnCorrectBalance_WhenUserExists() {
        // Given
        Long userId = 1L;
        User user = new User();
        user.setBalance(500);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // When
        int balance = userService.getBalance(userId);

        // Then
        assertEquals(500, balance);
        verify(userRepository).findById(userId);
    }

    @Test
    void getBalance_ShouldThrowException_WhenUserDoesNotExist() {
        // Given
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // When & Then
        Exception exception = assertThrows(IllegalArgumentException.class, () -> userService.getBalance(userId));
        assertEquals("User does not exist!", exception.getMessage());
    }

    @Test
    void updateBalance_ShouldUpdateBalanceCorrectly_WhenFundsAreValid() {
        // Given
        Long userId = 1L;
        User user = new User();
        user.setBalance(1000);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // Kampanie o łącznej kwocie 400
        Campaign campaign1 = new Campaign();
        campaign1.setFund(200);
        Campaign campaign2 = new Campaign();
        campaign2.setFund(200);
        when(campaignRepository.findAll()).thenReturn(List.of(campaign1, campaign2));

        // When
        userService.updateBalance(userId);

        // Then
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();
        assertEquals(600, savedUser.getBalance()); // 1000 - (200 + 200)
    }

    @Test
    void updateBalance_ShouldThrowException_WhenFundsExceedLimit() {
        // Given
        Long userId = 1L;
        User user = new User();
        user.setBalance(1000);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // Kampanie o łącznej kwocie 1200 (więcej niż limit 1000)
        Campaign campaign1 = new Campaign();
        campaign1.setFund(600);
        Campaign campaign2 = new Campaign();
        campaign2.setFund(600);
        when(campaignRepository.findAll()).thenReturn(List.of(campaign1, campaign2));

        // When & Then
        Exception exception = assertThrows(IllegalArgumentException.class, () -> userService.updateBalance(userId));
        assertEquals("You dont have enough money!", exception.getMessage());
    }
}
