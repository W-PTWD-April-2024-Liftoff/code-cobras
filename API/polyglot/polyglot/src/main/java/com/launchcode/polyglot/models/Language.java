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
    private Boolean accessFlag;
    private String username;
    //image

    //Constructor
    public Language(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
//        this.accessFlag = accessFlag;
//        this.username = username;
        //, Boolean accessFlag, String username
    }

    public Language() {

    }
}
