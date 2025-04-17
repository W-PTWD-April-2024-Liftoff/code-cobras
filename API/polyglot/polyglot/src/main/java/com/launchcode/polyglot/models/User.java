package com.launchcode.polyglot.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

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

    @NotNull
    private String pwHash;

    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User(String username, String email, String bio, String password) {
        this.username = username;
        this.email = email;
        this.bio = bio;
        this.pwHash = encoder.encode(password);
    }

    public User() {}

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }

    public String getPassword() {
        return pwHash;
    }
}