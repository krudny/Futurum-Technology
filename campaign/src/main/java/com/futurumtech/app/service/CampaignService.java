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
    private final StatusService statusService;
    private final ProductService productService;

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


}
