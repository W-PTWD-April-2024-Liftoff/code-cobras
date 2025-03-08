package com.launchcode.polyglot.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.List;

public class Vowel {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String height;
    private String roundness;
    private String backness;

    @ManyToMany(mappedBy = "vowels")
    private List<Language> languages = new ArrayList<>();

    public Vowel() {

    }

}
