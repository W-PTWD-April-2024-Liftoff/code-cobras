package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.exceptions.LanguageNotFoundException;
import com.launchcode.polyglot.models.Language;
import com.launchcode.polyglot.models.data.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@RequestMapping
@RestController
@CrossOrigin("http://localhost:5173")
public class LanguageController {

    @Autowired
    private LanguageRepository languageRepository;

    @PostMapping("/addlanguage")
    public ResponseEntity<String> addLanguage(@RequestBody Language language) {
        return ResponseEntity.ok("Language added successfully");
    }
//    @PostMapping("/addlanguage")
//    public String newLanguage(@RequestBody Language newLanguage) {
//        String returnMsg;
//
//        Language existingLanguage = languageRepository.findByName(newLanguage.getName());
//
//        if (existingLanguage != null) {
//            returnMsg = "A Language with that name already exists";
//        } else {
//            Language aLanguage = new Language(newLanguage.getName(),
//                    newLanguage.getDescription(),
//                    newLanguage.getAccessFlag(),
//                    newLanguage.getUsername());
//            languageRepository.save(aLanguage);
//            returnMsg = "Success";
//        }
//        return returnMsg;
//    }

    @GetMapping("/languages")
    public Iterable<Language> getAllLanguages(@PathVariable int id) {
        List<Language> returnList = (List<Language>) languageRepository.findAll();
        return returnList;
        // maybe do an if statement
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
