package com.futurumtech.app.repository;

import com.futurumtech.app.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
