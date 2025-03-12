package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
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
public Comment() {

}

}
