package com.launchcode.polyglot.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Syllable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int onsetLength;
    private int codaLength;
    private int onsetRequiredLength;
    private int codaRequiredLength;

    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private Language language;

    // Default constructor
    public Syllable() {}

    // Constructor with parameters
    public Syllable(int onsetLength, int codaLength, int onsetRequiredLength, int codaRequiredLength, Language language) {
        this.onsetLength = onsetLength;
        this.codaLength = codaLength;
        this.onsetRequiredLength = onsetRequiredLength;
        this.codaRequiredLength = codaRequiredLength;
        this.language = language;
    }

}
