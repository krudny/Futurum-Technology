package com.futurumtech.app.service;

import com.futurumtech.app.DTO.CampaignRequest;
import com.futurumtech.app.model.Campaign;
import com.futurumtech.app.model.Product;
import com.futurumtech.app.model.enums.Status;
import com.futurumtech.app.repository.CampaignRepository;
import com.futurumtech.app.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CampaignService {
    private final CampaignRepository campaignRepository;
    private final ProductRepository productRepository;

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public void addCampaign(CampaignRequest request) {
        if (request.getBid() > request.getFund()) {
            throw new IllegalArgumentException("Bid cannot be greater than fund!");
        }

        Product product = productRepository.findById(request.getProductID()).orElseThrow(() -> new IllegalArgumentException("Such product does not exist!"));

        Status status;
        try {
            status = Status.valueOf(request.getStatus());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status");
        }

        Campaign campaign = Campaign.builder()
                .name(request.getName())
                .bid(request.getBid())
                .fund(request.getFund())
                .radius(request.getRadius())
                .product(product)
                .status(status)
                .build();

        campaignRepository.save(campaign);
    }


}
