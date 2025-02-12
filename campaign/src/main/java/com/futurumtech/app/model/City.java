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
    public Long id;

    @NonNull
    public String name;
}
