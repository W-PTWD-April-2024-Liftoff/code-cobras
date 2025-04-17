package com.launchcode.polyglot.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Data
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private String accessFlag;
    private String username;

    @Lob
    private byte[] image;
    private String imageBase64;

    @OneToMany(mappedBy = "language", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("comment-language")
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "language_vowel",
            joinColumns = @JoinColumn(name = "language_id"),
            inverseJoinColumns = @JoinColumn(name = "vowel_id")
    )
    private List<Vowel> vowels = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "language_consonant",
            joinColumns = @JoinColumn(name = "language_id"),
            inverseJoinColumns = @JoinColumn(name = "consonant_id")
    )
    private List<Consonant> consonants;

    @OneToOne(mappedBy = "language", cascade = CascadeType.ALL)
    private Syllable syllable;

    public Language(String name, String description, String accessFlag, String username, byte[] image) {
        this.name = name;
        this.description = description;
        this.accessFlag = accessFlag;
        this.username = username;
        this.image = image;
    }

    public Language() {}

    @Override
    public String toString() {
        return "Language{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", accessFlag='" + accessFlag + '\'' +
                ", username='" + username + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Language language = (Language) o;
        return getId() == language.getId() &&
                Objects.equals(getName(), language.getName()) &&
                Objects.equals(getDescription(), language.getDescription()) &&
                Objects.equals(getAccessFlag(), language.getAccessFlag()) &&
                Objects.equals(getUsername(), language.getUsername()) &&
                Objects.equals(getImage(), language.getImage());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getAccessFlag(), getUsername(), getImage());
    }
}
