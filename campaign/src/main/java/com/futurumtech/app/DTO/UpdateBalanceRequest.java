package com.futurumtech.app.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class UpdateBalanceRequest {
    @NotNull(message = "User ID cannot be null")
    @Min(value = 1, message = "User ID must be at least 1")
    private Long userId;

    @Min(value = 0, message = "Balance cannot be less than 0!")
    private int newBalance;
}