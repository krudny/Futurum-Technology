package com.futurumtech.app.service;

import com.futurumtech.app.model.City;
import com.futurumtech.app.repository.CityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CityServiceTest {

    private CityRepository cityRepository;
    private CityService cityService;

    @BeforeEach
    void setUp() {
        cityRepository = mock(CityRepository.class);
        cityService = new CityService(cityRepository);
    }

    @Test
    void getAllCities_ShouldReturnCityList() {
        // Given
        City city1 = new City();
        city1.setName("Warsaw");

        City city2 = new City();
        city2.setName("Krakow");

        List<City> expectedCities = List.of(city1, city2);
        when(cityRepository.findAll()).thenReturn(expectedCities);

        // When
        List<City> actualCities = cityService.getAllCities();

        // Then
        assertEquals(expectedCities, actualCities);
        verify(cityRepository).findAll();
    }

    @Test
    void getAllCities_ShouldReturnEmptyList_WhenNoCitiesPresent() {
        // Given
        when(cityRepository.findAll()).thenReturn(List.of());

        // When
        List<City> actualCities = cityService.getAllCities();

        // Then
        assertEquals(0, actualCities.size());
        verify(cityRepository).findAll();
    }
}
