package com.launchcode.polyglot.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Syllable {

    @Id
    @GeneratedValue
    private int id;

    private int onsetLength;
    private int codaLength;
    private int onsetRequiredLength;
    private int codaRequiredLength;

    @OneToOne
    @JoinColumn(name = "language_id")
    @JsonBackReference("syllable-language")
    private Language language;

    public Syllable(int id, int onsetLength, int codaLength, int onsetRequiredLength, int codaRequiredLength) {
        this.id = id;
        this.onsetLength = onsetLength;
        this.codaLength = codaLength;
        this.onsetRequiredLength = onsetRequiredLength;
        this.codaRequiredLength = codaRequiredLength;
    }

    public Syllable() {}
}