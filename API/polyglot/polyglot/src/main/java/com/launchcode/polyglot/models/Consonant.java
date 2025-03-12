package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
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

}
