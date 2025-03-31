package com.launchcode.polyglot.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

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

    @ManyToMany(mappedBy = "vowels")
    @JsonBackReference
    private List<Language> languages;

    //Empty Constructor
    public Vowel() {
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getHeight() {
        return height;
    }

    public String getRoundness() {
        return roundness;
    }

    public String getBackness() {
        return backness;
    }

    public List<Language> getLanguages() {
        return languages;
    }
}
