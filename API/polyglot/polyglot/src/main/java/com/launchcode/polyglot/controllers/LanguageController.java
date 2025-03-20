package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.exceptions.LanguageNotFoundException;
import com.launchcode.polyglot.models.Language;
import com.launchcode.polyglot.models.data.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173",
        //allowMethods = {"GET, POST, PUT, DELETE"},
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
        Iterable<Language> allLanguages = languageRepository.findAll();
        List<Language> listLanguages = new ArrayList<>();
        List<Language> returnList = new ArrayList<>();
        allLanguages.forEach(listLanguages::add);

        for (Language language : allLanguages) { //adds all languages by X username to returnList
            if (language.getUsername().contentEquals(username)) {
                returnList.add(language);
            }
        }
        if (returnList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else if (!returnList.isEmpty()){
            return ResponseEntity.ok(returnList);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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

    @DeleteMapping("/viewlanguage/{id}")
    public String deleteLanguage(@PathVariable int id) {
        if (!languageRepository.existsById(id)) {
            throw new LanguageNotFoundException(id);
        }
        languageRepository.deleteById(id);
        return "Language with id "+id+" has been deleted successfully.";
    }
}
