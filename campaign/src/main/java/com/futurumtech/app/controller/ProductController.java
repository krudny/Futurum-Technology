package com.futurumtech.app.controller;

import com.futurumtech.app.model.Product;
import com.futurumtech.app.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("")
    public ResponseEntity<?> addProduct(@RequestParam("name") String name){
        productService.addProduct(name);
        return ResponseEntity.ok("Product added successfully!");
    }
}
