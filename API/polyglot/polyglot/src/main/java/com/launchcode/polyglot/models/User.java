package com.launchcode.polyglot.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import javax.annotation.processing.Generated;

public class User {

    @Id
    @GeneratedValue
    private int id;

    private String username;
    private String email;
    private String bio;
    private String authority;

    //Constructors
    public User(int id, String username, String email, String bio, String authority) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.bio = bio;
        this.authority = authority;
    }

    //Getters and Setters
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getBio() {return bio;}
    public void setBio(String bio) {this.bio = bio;}

    public String getAuthority() {return authority;}
    public void setAuthority(String authority) {this.authority = authority;}
}
