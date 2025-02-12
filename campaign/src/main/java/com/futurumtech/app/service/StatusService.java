package com.futurumtech.app.service;

import com.futurumtech.app.model.enums.Status;
import org.springframework.stereotype.Service;

@Service
public class StatusService {
    public Status getStatusFromString(String name) {
        Status status;
        try {
            status = Status.valueOf(name);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status!");
        }

        return status;
    }
}
