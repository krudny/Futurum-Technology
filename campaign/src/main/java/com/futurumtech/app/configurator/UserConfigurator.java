package com.futurumtech.app.configurator;

import com.futurumtech.app.model.User;
import com.futurumtech.app.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class UserConfigurator {
    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
        if (userRepository.count() == 0) {
            User sampleUser = new User();
            sampleUser.setBalance(1000);
            userRepository.save(sampleUser);
        }
    }
}
