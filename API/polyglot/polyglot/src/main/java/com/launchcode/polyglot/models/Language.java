package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Objects;

@Entity
@Data
public class Language {

    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String description;
    private String accessFlag;
    private String username;
    //image

    //Constructor
    public Language(String name, String description, String accessFlag, String username) {
        this.name = name;
        this.description = description;
        this.accessFlag = accessFlag;
        this.username = username;
    }

    public Language() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Language language = (Language) o;
        return getId() == language.getId() && Objects.equals(getName(), language.getName()) && Objects.equals(getDescription(), language.getDescription()) && Objects.equals(getAccessFlag(), language.getAccessFlag()) && Objects.equals(getUsername(), language.getUsername());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getAccessFlag(), getUsername());
    }
}
