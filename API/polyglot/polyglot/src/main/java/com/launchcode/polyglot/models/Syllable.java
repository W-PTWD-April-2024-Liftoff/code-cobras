package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
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

    //Getters and Setters
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public int getOnsetLength() {return onsetLength;}
    public void setOnsetLength(int onsetLength) {this.onsetLength = onsetLength;}

    public int getCodaLength() {return codaLength;}
    public void setCodaLength(int codaLength) {this.codaLength = codaLength;}

    public int getOnsetRequiredLength() {return onsetRequiredLength;}
    public void setOnsetRequiredLength(int onsetRequiredLength) {this.onsetRequiredLength = onsetRequiredLength;}

    public int getCodaRequiredLength() {return codaRequiredLength;}
    public void setCodaRequiredLength(int codaRequiredLength) {this.codaRequiredLength = codaRequiredLength;}
}
