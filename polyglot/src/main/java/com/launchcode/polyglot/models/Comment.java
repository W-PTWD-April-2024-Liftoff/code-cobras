package com.launchcode.polyglot.models;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private Language language;

    private LocalDateTime createdAt = LocalDateTime.now();
    public Comment(String text, User user, Language language) {
        this.text = text;
        this.user = user;
        this.language = language;
        this.createdAt = LocalDateTime.now();
    }
    public Comment() {}
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
