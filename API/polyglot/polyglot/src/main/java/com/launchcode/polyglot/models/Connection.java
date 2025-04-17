package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Connection {

    @Id
    @GeneratedValue
    private int id;

    private String username;
    private String followType;
    private String followName;

    //Constructor
    public Connection(int id, String username, String followType, String followName) {
        this.id = id;
        this.username = username;
        this.followType = followType;
        this.followName = followName;
    }

    public Connection() {
        
    }
}
