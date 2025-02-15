package com.futurumtech.app.service;

import com.futurumtech.app.model.enums.Status;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class StatusServiceTest {

    private StatusService statusService;

    @BeforeEach
    void setUp() {
        statusService = new StatusService();
    }

    @Test
    void getStatusFromString_ShouldReturnStatus_WhenValidNameProvided() {
        // Given
        String validStatus = "Active";

        // When
        Status result = statusService.getStatusFromString(validStatus);

        // Then
        assertEquals(Status.Active, result);
    }

    @Test
    void getStatusFromString_ShouldThrowException_WhenInvalidNameProvided() {
        // Given
        String invalidStatus = "NonExistentStatus";

        // When & Then
        Exception exception = assertThrows(IllegalArgumentException.class, () -> statusService.getStatusFromString(invalidStatus));
        assertEquals("Invalid status!", exception.getMessage());
    }

    @Test
    void getStatusFromString_ShouldBeCaseSensitive() {
        // Given
        String statusWithWrongCase = "active"; // powinno być "Active"

        // When & Then
        Exception exception = assertThrows(IllegalArgumentException.class, () -> statusService.getStatusFromString(statusWithWrongCase));
        assertEquals("Invalid status!", exception.getMessage());
    }
}
