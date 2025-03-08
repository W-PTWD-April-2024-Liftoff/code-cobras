package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
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
    public Language(int id, String name, String description, Boolean accessFlag, String username) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.accessFlag = accessFlag;
        this.username = username;
    }

    //Getters and Setters
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public Boolean getAccessFlag() {return accessFlag;}
    public void setAccessFlag(Boolean accessFlag) {this.accessFlag = accessFlag;}

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}
}
