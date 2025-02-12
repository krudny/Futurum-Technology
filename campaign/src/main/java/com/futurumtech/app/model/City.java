package com.futurumtech.app.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@RequiredArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    private String name;
}
