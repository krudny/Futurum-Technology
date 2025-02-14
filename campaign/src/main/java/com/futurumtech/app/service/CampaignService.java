package com.futurumtech.app.service;

import com.futurumtech.app.DTO.CampaignRequest;
import com.futurumtech.app.model.Campaign;
import com.futurumtech.app.model.City;
import com.futurumtech.app.model.Product;
import com.futurumtech.app.model.enums.Status;
import com.futurumtech.app.repository.CampaignRepository;
import com.futurumtech.app.repository.CityRepository;
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
    private final CityRepository cityRepository;

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
        Product product = productService.getProductById(request.getProductId().longValue());
        City city = cityRepository.findByName(request.getCity()).get();
        Status status = statusService.getStatusFromString(request.getStatus());


        if(userService.getBalance(1L) < request.getFund()) {
            throw new IllegalArgumentException("You dont have enough money!");
        }

        Campaign campaign = Campaign.builder()
                .name(request.getName())
                .bid(request.getBid())
                .fund(request.getFund())
                .radius(request.getRadius())
                .city(city)
                .product(product)
                .status(status)
                .build();

        campaignRepository.save(campaign);
        userService.updateBalance(1L);
    }

    public void updateCampaign(Long campaignId, CampaignRequest request) {
        checkBid(request.getBid(), request.getFund());
        Product product = productService.getProductById(request.getProductId().longValue());
        Status status = statusService.getStatusFromString(request.getStatus());
        City city = cityRepository.findByName(request.getCity()).get();
        Campaign campaign = campaignRepository.findById(campaignId).orElseThrow(() -> new IllegalArgumentException("Such campaign doesnt exist!"));

        if (userService.getBalance(1L) + campaign.getFund() - request.getFund() < 0) {
            throw new IllegalArgumentException("You dont have enough money!");
        }


        campaign.setName(request.getName());
        campaign.setBid(request.getBid());
        campaign.setFund(request.getFund());
        campaign.setRadius(request.getRadius());
        campaign.setCity(city);
        campaign.setProduct(product);
        campaign.setStatus(status);

        campaignRepository.save(campaign);
        userService.updateBalance(1L);
    }

    public void deleteCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId).get();
        Product product = campaign.getProduct();
        product.setCampaign(null);


        campaignRepository.deleteById(campaignId);
        userService.updateBalance(1L);
    }


}
