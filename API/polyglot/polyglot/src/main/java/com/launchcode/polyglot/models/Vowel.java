package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
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

    //Getters
    public int getId() {return id;}

    public String getName() {return name;}

    public String getHeight() {return height;}

    public String getRoundness() {return roundness;}

    public String getBackness() {return backness;}
}
