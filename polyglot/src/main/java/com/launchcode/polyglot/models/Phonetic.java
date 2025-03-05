package com.launchcode.polyglot.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Phonetic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String symbol;

    @Enumerated(EnumType.STRING)
    private PhoneticType type;

    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private Language language;

    public enum PhoneticType {
        VOWEL, CONSONANT
    }


}
