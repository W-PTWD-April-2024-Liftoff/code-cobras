package com.launchcode.polyglot.models.dto;

public class ConsonantLanguageJoinDTO {

    private int languageId;
    private int consonantId;

    public ConsonantLanguageJoinDTO(int languageId, int consonantId) {
        this.languageId = languageId;
        this.consonantId = consonantId;
    }

    public int getLanguageId() {
        return languageId;
    }

    public void setLanguageId(int languageId) {
        this.languageId = languageId;
    }

    public int getConsonantId() {
        return consonantId;
    }

    public void setConsonantId(int consonantId) {
        this.consonantId = consonantId;
    }
}
