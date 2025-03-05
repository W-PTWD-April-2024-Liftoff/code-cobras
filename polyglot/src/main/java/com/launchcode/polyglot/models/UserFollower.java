package com.launchcode.polyglot.models;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_followers")
@Data
public class UserFollower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower_id", nullable = false)
    private User follower;

    @ManyToOne
    @JoinColumn(name = "followee_id", nullable = false)
    private User followee;


}
