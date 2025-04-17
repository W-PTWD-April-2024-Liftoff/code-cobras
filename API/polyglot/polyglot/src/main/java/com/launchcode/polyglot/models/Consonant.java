package com.launchcode.polyglot.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Consonant {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String place;
    private String manner;
    private String voicing;
    private String unicode;

    @ManyToMany(mappedBy = "consonants")
    @JsonIgnore
    private List<Language> languages;

    public Consonant() {
    }

}
