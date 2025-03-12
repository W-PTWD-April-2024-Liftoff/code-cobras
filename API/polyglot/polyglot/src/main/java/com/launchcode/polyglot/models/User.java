package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue
    private int id;

    private String username;
    private String email;
    private String bio;
    private String authority;

    //Constructors
    public User(int id, String username, String email, String bio) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.bio = bio;
        //this.authority = authority; , String authority
    }

public User() {

}
}
