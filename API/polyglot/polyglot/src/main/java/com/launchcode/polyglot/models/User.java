package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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

    public int getId() {
        return id;
    }

    @NotNull
    private String pwHash;

    public String getPassword() {
        return password;
    }

    private String password;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    //Constructors
    public User( String username, String email, String bio, String password) {
        //this.id = id;
        this.username = username;
        this.email = email;
        this.bio = bio;
        this.pwHash = encoder.encode(password);
        //this.authority = authority; , String authority
    }

    public User() {

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }
}
