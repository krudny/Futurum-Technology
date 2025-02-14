package com.futurumtech.app.DTO;

import com.futurumtech.app.model.City;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CampaignRequest {
    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotNull(message = "Bid cannot be null")
    @Min(value = 1, message = "Bid cannot be less than 1")
    private Integer bid;

    @NotNull(message = "Fund cannot be null")
    @Min(value = 1, message = "Fund cannot be less than 1")
    private Integer fund;

    @NotBlank(message = "Status cannot be blank")
    private String status;

    @NotNull(message = "Radius cannot be null")
    @Min(value = 1, message = "Radius cannot be less than 1")
    private Integer radius;

    @NotNull(message = "City cannot be null")
    private String city;

    @NotNull(message = "Product ID cannot be null")
    @Min(value = 1, message = "Product ID cannot be less than 0")
    private Integer productId;
}
