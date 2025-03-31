package com.launchcode.polyglot.models.dto;

public class VowelLanguageJoinDTO {
    private int vowelId;
    private int languageId;

    public VowelLanguageJoinDTO(int languageId, int vowelId) {
        this.vowelId = vowelId;
        this.languageId = languageId;
    }

    public int getLanguageId() {
        return languageId;
    }

    public void setLanguageId(int languageId) {
        this.languageId = languageId;
    }

    public int getVowelId() {
        return vowelId;
    }

    public void setVowelId(int vowelId) {
        this.vowelId = vowelId;
    }
}
