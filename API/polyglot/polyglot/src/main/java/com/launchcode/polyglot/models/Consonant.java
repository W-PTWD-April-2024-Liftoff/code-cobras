package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Consonant {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String place;
    private String manner;
    private String voicing;

    public Consonant() {
    }

    //Getters
    public int getId() {return id;}

    public String getName() {return name;}

    public String getPlace() {return place;}

    public String getManner() {return manner;}

    public String getVoicing() {return voicing;}
}
