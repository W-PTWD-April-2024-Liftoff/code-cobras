package com.launchcode.polyglot.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

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

    //Getters and Setters
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    public String getFollowType() {return followType;}
    public void setFollowType(String followType) {this.followType = followType;}

    public String getFollowName() {return followName;}
    public void setFollowName(String followName) {this.followName = followName;}
}
