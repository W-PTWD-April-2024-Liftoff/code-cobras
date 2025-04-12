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
public class Vowel {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String height;
    private String roundness;
    private String backness;
    private String unicode;

    @ManyToMany(mappedBy = "vowels")
    @JsonIgnore
    private List<Language> languages;

    //Empty Constructor
    public Vowel() {
    }

}
