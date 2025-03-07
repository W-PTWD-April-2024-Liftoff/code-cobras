package com.launchcode.polyglot.models;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_favorites")
@Data
public class UserFavorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private Language language;

}
