package com.launchcode.polyglot.exceptions;

public class LanguageNotFoundException extends RuntimeException {
    public LanguageNotFoundException(int id) {
        super("Could not find the language with id: "+id);
    }
}

