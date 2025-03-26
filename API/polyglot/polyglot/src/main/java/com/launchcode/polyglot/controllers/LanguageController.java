package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.exceptions.LanguageNotFoundException;
import com.launchcode.polyglot.models.Language;
import com.launchcode.polyglot.models.data.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173",
        allowCredentials = "true",
        maxAge = 10000)
@RestController
public class LanguageController {

    @Autowired
    private LanguageRepository languageRepository;

    @PostMapping("/addlanguage")
    public ResponseEntity<String> addLanguage(@RequestBody(required=true) Language language) {

        Language existingLanguage = languageRepository.findByName(language.getName());

        if (existingLanguage != null) {
            return ResponseEntity.ok("A Language of this name already exists"); //ADD BAD response
        } else {
            Language aLanguage = new Language(language.getName(),
                    language.getDescription(),
                    language.getAccessFlag(),
                    language.getUsername());
            languageRepository.save(aLanguage);
        }
        return ResponseEntity.ok("Language added successfully");
    }

    @GetMapping("/languages")
    public ResponseEntity<List<Language>> getAllLanguagesByUsername(@RequestParam(required = false) String username) {
        List<Language> allLanguages = languageRepository.findAll();
        List<Language> returnList = new ArrayList<>();
        if (username != null && !username.isEmpty()) {
            returnList = allLanguages.stream()
                    .filter(language -> language.getUsername().equals(username))
                    .collect(Collectors.toList());
        } else {
            returnList = allLanguages;
        }

        if (returnList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return ResponseEntity.ok(returnList);
        }
    }

    @GetMapping("/viewlanguage")
    public ResponseEntity<Optional<Language>> getLanguage(@RequestParam(required = true) int id) {
        Optional<Language> returnLanguage = languageRepository.findById(id);
        String accessFlag = returnLanguage.get().getAccessFlag();
        if (accessFlag != null && accessFlag.equals("public")) {
            return ResponseEntity.ok(returnLanguage);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/editlanguage/{id}")
    public Language editLanguage(@RequestBody Language newLanguage, @PathVariable int id) {
        return languageRepository.findById(id)
                .map(language -> {
                    language.setName(newLanguage.getName());
                    language.setDescription(newLanguage.getDescription());
                    language.setAccessFlag(newLanguage.getAccessFlag());
                    return languageRepository.save(language);
                }).orElseThrow(()->new LanguageNotFoundException(id));
    }

    @DeleteMapping("/deletelanguage/{id}")
    public ResponseEntity<String> deleteLanguage(@PathVariable int id) {
        if (!languageRepository.existsById(id)) {
            throw new LanguageNotFoundException(id);
        }
        languageRepository.deleteById(id);
        return ResponseEntity.ok("Delete Successful");
    }
}
