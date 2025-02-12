package com.futurumtech.app.configurator;

import com.futurumtech.app.model.Product;
import com.futurumtech.app.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@AllArgsConstructor
public class ProductConfigurator {
    private final ProductRepository productRepository;

    @PostConstruct
    public void init() {
        if (productRepository.count() == 0) {
            Product product1 = new Product("Toy");
            Product product2 = new Product("Book");
            Product product3 = new Product("Laptop");
            Product product4 = new Product("Phone");
            Product product5 = new Product("Tablet");
            Product product6 = new Product("Camera");

            productRepository.saveAll(Arrays.asList(product1, product2, product3, product4, product5, product6));
        }
    }

}
