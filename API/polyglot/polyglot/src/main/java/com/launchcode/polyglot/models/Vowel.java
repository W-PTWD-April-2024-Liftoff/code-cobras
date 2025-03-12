package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Vowel {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String height;
    private String roundness;
    private String backness;

    //Empty Constructor
    public Vowel() {
    }

}
