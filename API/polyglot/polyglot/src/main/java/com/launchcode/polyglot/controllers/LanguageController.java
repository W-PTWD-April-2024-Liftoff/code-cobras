package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.exceptions.LanguageNotFoundException;
import com.launchcode.polyglot.models.Language;
import com.launchcode.polyglot.models.data.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Base64;

@CrossOrigin(origins = "http://localhost:5173",
        allowCredentials = "true",
        maxAge = 10000)
@RestController
public class LanguageController {

    @Autowired
    private LanguageRepository languageRepository;

//    @PostMapping("/addlanguage")
//    public ResponseEntity<String> addLanguage(@RequestBody(required=true) Language language) {
//
//        Language existingLanguage = languageRepository.findByName(language.getName());
//
//        if (existingLanguage != null) {
//            return ResponseEntity.ok("A Language of this name already exists"); //ADD BAD response
//        } else {
//            Language aLanguage = new Language(language.getName(),
//                    language.getDescription(),
//                    language.getAccessFlag(),
//                    language.getUsername());
//            languageRepository.save(aLanguage);
//        }
//        return ResponseEntity.ok("Language added successfully");
//    }
@PostMapping("/addlanguage")
public ResponseEntity<String> addLanguage(@RequestParam(required = true) String name,
                                          @RequestParam(required = true) String description,
                                          @RequestParam(required = true) String accessFlag,
                                          @RequestParam(required = true) String username,
                                          @RequestParam(value = "image", required = false) MultipartFile image) {
    Language existingLanguage = languageRepository.findByName(name);

    if (existingLanguage != null) {
        return ResponseEntity.ok("A Language of this name already exists");
    } else {
        try {
            Language language = new Language();
            language.setName(name);
            language.setDescription(description);
            language.setAccessFlag(accessFlag);
            language.setUsername(username);
            if (image != null && !image.isEmpty()) {
                language.setImage(image.getBytes()); // Save image as byte array
            }
            languageRepository.save(language);
            return ResponseEntity.ok("Language added successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the image");
        }
    }
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

        for (Language language : returnList) {
            if (language.getImage() != null) {
                String base64Image = Base64.getEncoder().encodeToString(language.getImage());
                language.setImageBase64(base64Image);
            }
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

    //Edit a language
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

    //Edit a language's image
    // Update the image of an existing Language by ID
    @PutMapping("/editlanguage/{id}/image")
    public ResponseEntity<String> updateImage(@PathVariable int id, @RequestParam("image") MultipartFile image) {
        Optional<Language> language = languageRepository.findById(id);
        if (language.isPresent()) {
            try {
                Language editedLanguage = language.get();
                editedLanguage.setImage(image.getBytes()); // Update image with the new file
                languageRepository.save(editedLanguage);
                return ResponseEntity.ok("Image updated successfully");
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving the image");
            }
        }
        return new ResponseEntity<>("Language not found", HttpStatus.NOT_FOUND);
    }

    //Delete language
    @DeleteMapping("/deletelanguage/{id}")
    public ResponseEntity<String> deleteLanguage(@PathVariable int id) {
        if (!languageRepository.existsById(id)) {
            throw new LanguageNotFoundException(id);
        }
        languageRepository.deleteById(id);
        return ResponseEntity.ok("Delete Successful");
    }

    //Delete language's image
    @DeleteMapping("/deletelanguage/{id}/image")
    public ResponseEntity<String> deleteImage(@PathVariable int id) {
        Optional<Language> language = languageRepository.findById(id);
        if (language.isPresent()) {
            Language editedLanguage = language.get();
            editedLanguage.setImage(null); // Set the image field to null to delete the image
            languageRepository.save(editedLanguage);
            return ResponseEntity.ok("Image deleted successfully");
        }
        return new ResponseEntity<>("Language not found", HttpStatus.NOT_FOUND);
    }
}
