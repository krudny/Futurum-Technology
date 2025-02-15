package com.futurumtech.app.service;

import com.futurumtech.app.DTO.CampaignRequest;
import com.futurumtech.app.model.Campaign;
import com.futurumtech.app.model.City;
import com.futurumtech.app.model.Product;
import com.futurumtech.app.model.enums.Keywords;
import com.futurumtech.app.model.enums.Status;
import com.futurumtech.app.repository.CampaignRepository;
import com.futurumtech.app.repository.CityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CampaignServiceTest {

    private CampaignRepository campaignRepository;
    private StatusService statusService;
    private ProductService productService;
    private UserService userService;
    private CityRepository cityRepository;
    private CampaignService campaignService;

    @BeforeEach
    void setUp() {
        campaignRepository = mock(CampaignRepository.class);
        statusService = mock(StatusService.class);
        productService = mock(ProductService.class);
        userService = mock(UserService.class);
        cityRepository = mock(CityRepository.class);

        campaignService = new CampaignService(campaignRepository, statusService, productService, userService, cityRepository);
    }

    @Test
    void getAllCampaigns_ShouldReturnCampaignList() {
        // Given: existing campaigns in the database
        Campaign campaign = new Campaign();
        when(campaignRepository.findAll()).thenReturn(List.of(campaign));

        // When: fetching all campaigns
        List<Campaign> campaigns = campaignService.getAllCampaigns();

        // Then: the list should contain one campaign
        assertEquals(1, campaigns.size());
        verify(campaignRepository).findAll();
    }

    @Test
    void addCampaign_ShouldAddCampaign_WhenValidRequest() {
        // Given: a valid campaign request
        CampaignRequest request = new CampaignRequest();
        request.setName("Test Campaign");
        request.setBid(100);
        request.setFund(1000);
        request.setRadius(10);
        request.setKeyword("Display");
        request.setCity("TestCity");
        request.setProductId(1);
        request.setStatus("Active");

        Product product = new Product();
        City city = new City();
        Status status = Status.Active;

        when(productService.getProductById(1L)).thenReturn(product);
        when(cityRepository.findByName("TestCity")).thenReturn(Optional.of(city));
        when(statusService.getStatusFromString("Active")).thenReturn(status);
        when(userService.getBalance(1L)).thenReturn(2000);

        // When: adding a campaign
        campaignService.addCampaign(request);

        // Then: the campaign should be saved with correct values
        ArgumentCaptor<Campaign> campaignCaptor = ArgumentCaptor.forClass(Campaign.class);
        verify(campaignRepository).save(campaignCaptor.capture());

        Campaign savedCampaign = campaignCaptor.getValue();
        assertEquals("Test Campaign", savedCampaign.getName());
        assertEquals(100, savedCampaign.getBid());
        assertEquals(1000, savedCampaign.getFund());
        assertEquals(Keywords.Display, savedCampaign.getKeyword());

        verify(userService).updateBalance(1L);
    }

    @Test
    void addCampaign_ShouldThrowException_WhenBidGreaterThanFund() {
        // Given: a request with bid greater than fund
        CampaignRequest request = new CampaignRequest();
        request.setBid(200);
        request.setFund(100);

        // When: trying to add the campaign
        Exception exception = assertThrows(IllegalArgumentException.class, () -> campaignService.addCampaign(request));

        // Then: an exception should be thrown with the appropriate message
        assertEquals("Bid cannot be greater than fund!", exception.getMessage());
    }

    @Test
    void addCampaign_ShouldThrowException_WhenInsufficientBalance() {
        // Given: a request with insufficient user balance
        CampaignRequest request = new CampaignRequest();
        request.setBid(100);
        request.setFund(1000);
        request.setProductId(1);
        request.setCity("TestCity");
        request.setStatus("Active");
        request.setKeyword("Display");

        when(productService.getProductById(1L)).thenReturn(new Product());
        when(cityRepository.findByName("TestCity")).thenReturn(Optional.of(new City()));
        when(statusService.getStatusFromString("Active")).thenReturn(Status.Active);
        when(userService.getBalance(1L)).thenReturn(500);

        // When: trying to add the campaign
        Exception exception = assertThrows(IllegalArgumentException.class, () -> campaignService.addCampaign(request));

        // Then: an exception should be thrown with the appropriate message
        assertEquals("You dont have enough money!", exception.getMessage());
    }

    @Test
    void updateCampaign_ShouldUpdateCampaign_WhenValidRequest() {
        // Given: an existing campaign and a valid request to update it
        Long campaignId = 1L;
        Campaign existingCampaign = new Campaign();
        existingCampaign.setFund(1000);

        CampaignRequest request = new CampaignRequest();
        request.setName("Updated Campaign");
        request.setBid(150);
        request.setFund(900);
        request.setRadius(20);
        request.setKeyword("Social");
        request.setCity("TestCity");
        request.setProductId(1);
        request.setStatus("Active");

        when(campaignRepository.findById(campaignId)).thenReturn(Optional.of(existingCampaign));
        when(productService.getProductById(1L)).thenReturn(new Product());
        when(cityRepository.findByName("TestCity")).thenReturn(Optional.of(new City()));
        when(statusService.getStatusFromString("Active")).thenReturn(Status.Active);
        when(userService.getBalance(1L)).thenReturn(2000);

        // When: updating the campaign
        campaignService.updateCampaign(campaignId, request);

        // Then: the campaign should be updated with new values
        assertEquals("Updated Campaign", existingCampaign.getName());
        assertEquals(150, existingCampaign.getBid());
        assertEquals(900, existingCampaign.getFund());
        assertEquals(20, existingCampaign.getRadius());
        verify(campaignRepository).save(existingCampaign);
        verify(userService).updateBalance(1L);
    }

    @Test
    void deleteCampaign_ShouldDeleteCampaign_WhenValidId() {
        // Given: a campaign with a valid ID
        Long campaignId = 1L;
        Campaign campaign = new Campaign();
        Product product = new Product();
        campaign.setProduct(product);
        product.setCampaign(campaign);

        when(campaignRepository.findById(campaignId)).thenReturn(Optional.of(campaign));

        // When: deleting the campaign
        campaignService.deleteCampaign(campaignId);

        // Then: the campaign should be deleted and the user's balance updated
        verify(campaignRepository).deleteById(campaignId);
        verify(userService).updateBalance(1L);
        assertNull(product.getCampaign());
    }
}
