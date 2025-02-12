package com.futurumtech.app.model;

import com.futurumtech.app.model.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private Integer bid;

    private Integer fund;

    private Status status;

    private Integer radius;

    @OneToOne(mappedBy = "campaign")
    private Product product;
}