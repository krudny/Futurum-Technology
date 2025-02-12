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

    public String name;

    public Integer bid;

    public Integer fund;

    public Status status;

    public Integer radius;

    @OneToOne(mappedBy = "campaign")
    private Product product;
}
