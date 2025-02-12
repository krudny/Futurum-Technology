package com.futurumtech.app.controller;

import com.futurumtech.app.model.City;
import com.futurumtech.app.repository.CityRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/city")
public class CityController {
    private final CityRepository cityRepository;

    @GetMapping("")
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

}
