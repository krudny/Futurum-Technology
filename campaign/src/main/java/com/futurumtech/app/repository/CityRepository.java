package com.futurumtech.app.repository;

import com.futurumtech.app.model.City;
import com.futurumtech.app.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {
    Optional<City> findByName(String name);
}
