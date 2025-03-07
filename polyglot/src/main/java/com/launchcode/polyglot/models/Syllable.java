package com.launchcode.polyglot.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
@Entity
public class Syllable {

    @Id
    @GeneratedValue
    private int id;

    private int onsetLength;
    private int codaLength;
    private int onsetRequiredLength;
    private int codaRequiredLength;
}
