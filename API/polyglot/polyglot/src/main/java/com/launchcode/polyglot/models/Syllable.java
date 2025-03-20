package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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

    //Constructor
    public Syllable(int id, int onsetLength, int codaLength, int onsetRequiredLength, int codaRequiredLength) {
        this.id = id;
        this.onsetLength = onsetLength;
        this.codaLength = codaLength;
        this.onsetRequiredLength = onsetRequiredLength;
        this.codaRequiredLength = codaRequiredLength;
    }

    //Default no-arg constructor
    public Syllable() {}

}