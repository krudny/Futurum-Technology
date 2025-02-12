package com.futurumtech.app.controller;

import com.futurumtech.app.DTO.CampaignRequest;
import com.futurumtech.app.model.Campaign;
import com.futurumtech.app.service.CampaignService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/campaigns")
public class CampaignController {
    private final CampaignService campaignService;

    @GetMapping("")
    public List<Campaign> getAllCampaigns() {
        return campaignService.getAllCampaigns();
    }

    @PostMapping("")
    public ResponseEntity<?> addCampaign(@Valid @RequestBody CampaignRequest request) {
        campaignService.addCampaign(request);

        return ResponseEntity.ok("Campaign added successfully!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCampaign(@PathVariable Long id, @Valid @RequestBody CampaignRequest request) {
        campaignService.updateCampaign(id, request);

        return ResponseEntity.ok("Campaign updated successfully!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCampaign(@PathVariable Long id) {
        campaignService.deleteCampaign(id);

        return ResponseEntity.ok("Campaign deleted successfully!");
    }
}
