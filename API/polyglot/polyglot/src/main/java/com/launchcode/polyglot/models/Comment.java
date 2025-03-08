package com.launchcode.polyglot.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class Comment {

    @Id
    @GeneratedValue
    private int id;

    private String username;
    private String comment;
    private String accessFlag;


    //Constructor
    public Comment(int id, String username, String comment, String accessFlag) {
        this.id = id;
        this.username = username;
        this.comment = comment;
        this.accessFlag = accessFlag;
    }

    //Getters and Setters
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getUsername() {return username;}
    public void setUsername(String username) {this.username = username;}

    public String getComment() {return comment;}
    public void setComment(String comment) {this.comment = comment;}

    public String getAccessFlag() {return accessFlag;}
    public void setAccessFlag(String accessFlag) {this.accessFlag = accessFlag;}
}
