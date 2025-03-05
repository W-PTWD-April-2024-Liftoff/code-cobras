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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getRoundness() {
        return roundness;
    }

    public void setRoundness(String roundness) {
        this.roundness = roundness;
    }

    public String getBackness() {
        return backness;
    }

    public void setBackness(String backness) {
        this.backness = backness;
    }
}
