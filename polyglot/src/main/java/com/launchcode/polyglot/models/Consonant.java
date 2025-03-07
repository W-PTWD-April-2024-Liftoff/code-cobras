package com.launchcode.polyglot.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Consonant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String place;

    @Column(nullable = false)
    private String manner;

    @Column(nullable = false)
    private String voicing;

    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private Language language;

    // Default Constructor
    public Consonant() {}

    // Constructor with parameters
    public Consonant(String name, String place, String manner, String voicing, Language language) {
        this.name = name;
        this.place = place;
        this.manner = manner;
        this.voicing = voicing;
        this.language = language;
    }

}
