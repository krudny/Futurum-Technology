package com.futurumtech.app.configurator;

import com.futurumtech.app.model.City;
import com.futurumtech.app.repository.CityRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@AllArgsConstructor
public class CityConfigurator {
    private final CityRepository cityRepository;

    @PostConstruct
    public void init() {
        if (cityRepository.count() == 0) {
            City city1 = new City("Warszawa");
            City city2 = new City("Kraków");
            City city3 = new City("Łódź");
            City city4 = new City("Wrocław");
            City city5 = new City("Poznań");
            City city6 = new City("Gdańsk");

            cityRepository.saveAll(Arrays.asList(city1, city2, city3, city4, city5, city6));
        }
    }
}
