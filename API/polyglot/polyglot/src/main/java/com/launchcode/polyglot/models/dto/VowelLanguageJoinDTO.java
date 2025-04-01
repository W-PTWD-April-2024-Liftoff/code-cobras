package com.launchcode.polyglot.models.dto;

public class VowelLanguageJoinDTO {
    private int languageId;
    private int vowelId;

    public VowelLanguageJoinDTO(int languageId, int vowelId) {
        this.languageId = languageId;
        this.vowelId = vowelId;
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
