package com.launchcode.polyglot.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.List;

public class Consonant {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String place;
    private String manner;
    private String voicing;

    @ManyToMany(mappedBy = "consonants")
    private List<Language> languages = new ArrayList<>();


}
