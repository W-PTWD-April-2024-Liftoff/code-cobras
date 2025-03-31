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
    private String commentBody;
    private String accessFlag;
    private String languageName;


    //Constructor
    public Comment(int id, String username, String commentBody, String accessFlag, String languageName) {
        this.id = id;
        this.username = username;
        this.commentBody = commentBody;
        this.accessFlag = accessFlag;
        this.languageName = languageName;
    }
    public Comment() {

    }

}
