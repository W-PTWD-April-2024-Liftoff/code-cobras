package com.launchcode.polyglot.models;



import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Boolean isPublic = true;

    @OneToMany(mappedBy = "language", cascade = CascadeType.ALL)
    private Set<Phonetic> phonetics;

    @OneToMany(mappedBy = "language", cascade = CascadeType.ALL)
    private Set<Syllable> syllables;

    @OneToMany(mappedBy = "language", cascade = CascadeType.ALL)
    private Set<Comment> comments;

    public Language(String name, String description, Boolean isPublic,User user) {
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
        this.user=user;
    }
}

