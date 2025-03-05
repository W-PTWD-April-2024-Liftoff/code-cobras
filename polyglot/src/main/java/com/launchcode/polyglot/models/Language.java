package com.launchcode.polyglot.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class Language {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String description;
}
