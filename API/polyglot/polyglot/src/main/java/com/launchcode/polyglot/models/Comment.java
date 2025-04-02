package com.launchcode.polyglot.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;
    private String commentBody;
    private String accessFlag;
    private String languageName;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "language_id")
    private Language language;

    public Comment() {}

    public Comment(int id, String username, String commentBody, String accessFlag, String languageName) {
        this.id = id;
        this.username = username;
        this.commentBody = commentBody;
        this.accessFlag = accessFlag;
        this.languageName = languageName;
    }
}