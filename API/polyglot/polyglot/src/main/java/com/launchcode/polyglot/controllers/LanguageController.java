package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.exceptions.LanguageNotFoundException;
import com.launchcode.polyglot.models.Consonant;
import com.launchcode.polyglot.models.Language;
import com.launchcode.polyglot.models.Syllable;
import com.launchcode.polyglot.models.Vowel;
import com.launchcode.polyglot.models.data.ConsonantRepository;
import com.launchcode.polyglot.models.data.LanguageRepository;
import com.launchcode.polyglot.models.data.SyllableRepository;
import com.launchcode.polyglot.models.data.VowelRepository;
import com.launchcode.polyglot.models.dto.ConsonantLanguageJoinDTO;
import com.launchcode.polyglot.models.dto.VowelLanguageJoinDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173",
        allowCredentials = "true",
        maxAge = 10000)
@RestController
public class LanguageController {

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private VowelRepository vowelRepository;

    @Autowired
    private ConsonantRepository consonantRepository;

    @Autowired
    private SyllableRepository syllableRepository;

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

    @PostMapping("/addlanguage/vowels")
    public ResponseEntity<String> addVowels(@RequestParam String languageName, @RequestParam Map<String, String> vowels) {
        Language language = languageRepository.findByName(languageName);
        if (language == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
        }
        List<Vowel> selectedVowels = new ArrayList<>();
        for (Map.Entry<String, String> vowelEntry : vowels.entrySet()) {
            String vowelName = vowelEntry.getKey();
            String vowelPresence = vowelEntry.getValue();

            if (vowelPresence.equals(vowelName)) {
                Vowel vowel = vowelRepository.findByName(vowelName);
                if (vowel != null) {
                    selectedVowels.add(vowel);
                }
            }
        }

        language.getVowels().addAll(selectedVowels);
        languageRepository.save(language);

        return ResponseEntity.ok("Vowels successfully added");
    }

    @PostMapping("/addlanguage/consonants")
    public ResponseEntity<String> addConsonants(@RequestParam String languageName, @RequestParam Map<String, String> consonants) {
        Language language = languageRepository.findByName(languageName);
        if (language == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
        }

        List<Consonant> selectedConsonants = new ArrayList<>();
        for (Map.Entry<String, String> consonantEntry : consonants.entrySet()) {
            String consonantName = consonantEntry.getKey();
            String consonantPresence = consonantEntry.getValue();

            if (consonantPresence.equals(consonantName)) {
                Consonant consonant = consonantRepository.findByName(consonantName);
                if (consonant != null) {
                    selectedConsonants.add(consonant);
                }
            }
        }

        if (selectedConsonants.isEmpty()) {
            return ResponseEntity.ok("No consonants found.");
        }

        language.getConsonants().addAll(selectedConsonants);
        languageRepository.save(language);
        return ResponseEntity.ok("Consonants successfully added");
    }

    @PostMapping("/addlanguage/syllables")
    public ResponseEntity<String> addSyllable() {
        return ResponseEntity.ok("");
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

    //All Vowel data
    @GetMapping("/languages/vowels")
    public ResponseEntity<List<VowelLanguageJoinDTO>> getAllVowelLanguageJoinData() {
        List<VowelLanguageJoinDTO> returnList = vowelRepository.findLanguageVowelJoinData();
        return ResponseEntity.ok(returnList);
    }

    //Vowel data for specific language
    @GetMapping("/languages/vowels/{id}")
    public ResponseEntity<List<VowelLanguageJoinDTO>> getAllVowelLanguageJoinDataByLanguage(@PathVariable int id) {
        List<VowelLanguageJoinDTO> returnList = vowelRepository.findLanguageVowelJoinDataByLanguage(id);
        return ResponseEntity.ok(returnList);
    }

    //All consonant data
    @GetMapping("/languages/consonants")
    public ResponseEntity<List<ConsonantLanguageJoinDTO>> getAllConsonantLanguageJoinData() {
        List<ConsonantLanguageJoinDTO> returnList = consonantRepository.findLanguageConsonantJoinData();
        return ResponseEntity.ok(returnList);
    }

    //Consonant data for specific language
    @GetMapping("/languages/consonants/{id}")
    public ResponseEntity<List<ConsonantLanguageJoinDTO>> getAllConsonantLanguageJoinDataByLanguage(@PathVariable int id) {
        List<ConsonantLanguageJoinDTO> returnList = consonantRepository.findLanguageConsonantJoinDataByLanguage(id);
        return ResponseEntity.ok(returnList);
    }

//    @GetMapping("/languages/syllable")
//    public ResponseEntity<List<Syllable>> getAllVSyllables() {
//        List<Syllable> allSyllables = syllableRepository.findAll();
//        return ResponseEntity.ok(allSyllables);
//    }

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

    //Update vowels

    //Update consonants

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
