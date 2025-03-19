package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Language {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String description;
    private String accessFlag;
    private String username;
    //image

    //Constructor
    public Language(String name, String description, String accessFlag, String username) {
        this.name = name;
        this.description = description;
        this.accessFlag = accessFlag;
        this.username = username;
    }

    public Language() {

    }
}
