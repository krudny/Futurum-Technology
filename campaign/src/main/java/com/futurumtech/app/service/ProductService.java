package com.futurumtech.app.service;

import com.futurumtech.app.model.Product;
import com.futurumtech.app.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    private boolean productExists(String name) {
        return productRepository.findByName(name).isPresent();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Such product does not exist!"));
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void addProduct(String name) {
        if (productExists(name)) {
            throw new IllegalArgumentException("Such product already exists!");
        }

        Product product = new Product(name);
        productRepository.save(product);
    }
}

