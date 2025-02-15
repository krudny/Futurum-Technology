package com.futurumtech.app.service;

import com.futurumtech.app.model.Product;
import com.futurumtech.app.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    private ProductRepository productRepository;
    private ProductService productService;

    @BeforeEach
    void setUp() {
        productRepository = mock(ProductRepository.class);
        productService = new ProductService(productRepository);
    }

    @Test
    void getProductById_ShouldReturnProduct_WhenProductExists() {
        // Given
        Long productId = 1L;
        Product expectedProduct = new Product("Test Product");
        when(productRepository.findById(productId)).thenReturn(Optional.of(expectedProduct));

        // When
        Product actualProduct = productService.getProductById(productId);

        // Then
        assertEquals(expectedProduct, actualProduct);
        verify(productRepository).findById(productId);
    }

    @Test
    void getProductById_ShouldThrowException_WhenProductDoesNotExist() {
        // Given
        Long productId = 1L;
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        // When & Then
        Exception exception = assertThrows(IllegalArgumentException.class, () -> productService.getProductById(productId));
        assertEquals("Such product does not exist!", exception.getMessage());
    }

    @Test
    void getAllProducts_ShouldReturnAllProducts() {
        // Given
        List<Product> expectedProducts = List.of(new Product("Product1"), new Product("Product2"));
        when(productRepository.findAll()).thenReturn(expectedProducts);

        // When
        List<Product> actualProducts = productService.getAllProducts();

        // Then
        assertEquals(expectedProducts, actualProducts);
        verify(productRepository).findAll();
    }

    @Test
    void addProduct_ShouldAddProduct_WhenProductDoesNotExist() {
        // Given
        String productName = "New Product";
        when(productRepository.findByName(productName)).thenReturn(Optional.empty());

        // When
        productService.addProduct(productName);

        // Then
        ArgumentCaptor<Product> productCaptor = ArgumentCaptor.forClass(Product.class);
        verify(productRepository).save(productCaptor.capture());

        Product savedProduct = productCaptor.getValue();
        assertEquals(productName, savedProduct.getName());
    }

    @Test
    void addProduct_ShouldThrowException_WhenProductAlreadyExists() {
        // Given
        String productName = "Existing Product";
        when(productRepository.findByName(productName)).thenReturn(Optional.of(new Product(productName)));

        // When & Then
        Exception exception = assertThrows(IllegalArgumentException.class, () -> productService.addProduct(productName));
        assertEquals("Such product already exists!", exception.getMessage());
    }
}
