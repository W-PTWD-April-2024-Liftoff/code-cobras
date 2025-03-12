package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.models.Language;
import com.launchcode.polyglot.models.data.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("http://localhost:5173")
public class LanguageController {

    @Autowired
    private LanguageRepository languageRepository;

    @PostMapping("/addLanguage")
    Language newLanguage(@RequestBody Language newLanguage) {
        return languageRepository.save(newLanguage);
    }

    @GetMapping("/viewlanguages")
    Iterable<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

}
