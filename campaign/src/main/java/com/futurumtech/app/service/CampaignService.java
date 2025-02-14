package com.futurumtech.app.service;

import com.futurumtech.app.DTO.CampaignRequest;
import com.futurumtech.app.model.Campaign;
import com.futurumtech.app.model.Product;
import com.futurumtech.app.model.enums.Status;
import com.futurumtech.app.repository.CampaignRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CampaignService {
    private final CampaignRepository campaignRepository;
    private final StatusService statusService;
    private final ProductService productService;
    private final UserService userService;

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    private void checkBid(int bid, int fund) {
        if (bid > fund) {
            throw new IllegalArgumentException("Bid cannot be greater than fund!");
        }
    }

    public void addCampaign(CampaignRequest request) {
        checkBid(request.getBid(), request.getFund());
        Product product = productService.getProductById(request.getProductID());
        Status status = statusService.getStatusFromString(request.getStatus());

        if(userService.getBalance(1L) < request.getFund()) {
            throw new IllegalArgumentException("You don't have enough money to create campaign!");
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
        userService.updateBalance(1L, request.getFund());
    }

    public void updateCampaign(Long campaignId, CampaignRequest request) {
        checkBid(request.getBid(), request.getFund());
        Product product = productService.getProductById(request.getProductID());
        Status status = statusService.getStatusFromString(request.getStatus());

        campaignRepository.findById(campaignId)
                .map(campaign -> {
                    campaign.setName(request.getName());
                    campaign.setBid(request.getBid());
                    campaign.setFund(request.getFund());
                    campaign.setRadius(request.getRadius());
                    campaign.setProduct(product);
                    campaign.setStatus(status);
                    return campaignRepository.save(campaign);
                })
                .orElseThrow(() -> new IllegalArgumentException("Such campaign does not exist!"));
    }

    public void deleteCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId).get();
        Product product = campaign.getProduct();
        product.setCampaign(null);

        userService.updateBalance(1L, (-1) * campaign.getFund());
        campaignRepository.deleteById(campaignId);
    }


}
