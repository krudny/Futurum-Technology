package com.futurumtech.app.service;

import com.futurumtech.app.model.City;
import com.futurumtech.app.repository.CityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CityService {
    private final CityRepository cityRepository;

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
}
