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
    public ResponseEntity<Map<String, Object>> addLanguage(@RequestParam(required = true) String name,
                                              @RequestParam(required = true) String description,
                                              @RequestParam(required = true) String accessFlag,
                                              @RequestParam(required = true) String username,
                                              @RequestParam(value = "image", required = false) MultipartFile image) {
        Language existingLanguage = languageRepository.findByName(name);

        if (existingLanguage != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Language of that name already exists");
            response.put("id", existingLanguage.getId());
            return ResponseEntity.ok(response);
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
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Language successfully added");
                response.put("id", language.getId());
                return ResponseEntity.ok(response);
            } catch (IOException e) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Image could not be added.");
                response.put("id", "null");
                return ResponseEntity.ok(response);
            }
        }
    }

    @PostMapping("/addlanguage/vowels/{languageId}")
    public ResponseEntity<String> addVowels(@PathVariable int languageId, @RequestParam Map<String, String> vowels) {
        System.out.println(vowels); // do languageId as a PathVariable instead?
        System.out.println(languageId);
        //int languageIdParsed = Integer.parseInt(languageId);
        Optional<Language> languageOpt = languageRepository.findById(languageId);
        if (!languageOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
        }
        Language language = languageOpt.get();

        List<Vowel> selectedVowels = new ArrayList<>();

        for (Map.Entry<String, String> vowelEntry : vowels.entrySet()) {
            Integer vowelId = Integer.parseInt(vowelEntry.getKey());
            String vowelPresence = vowelEntry.getValue();

            if (vowelPresence.equals("true")) {
                Optional<Vowel> vowel = vowelRepository.findById(vowelId);
                if (vowel != null && !selectedVowels.contains(vowel)) {
                    selectedVowels.add(vowel.get());
                }
                System.out.println(selectedVowels);
            }
        }
        if (selectedVowels.isEmpty()) {
            return ResponseEntity.ok("Vowels could not be added.");
        }

        language.getVowels().addAll(selectedVowels);
        languageRepository.save(language);
        return ResponseEntity.ok("Vowels successfully added");
    }

    @PostMapping("/addlanguage/consonants/{languageId}")
    public ResponseEntity<String> addConsonants(@PathVariable int languageId, @RequestParam Map<String, String> consonants) {
        System.out.println(consonants);
        //int languageIdParsed = Integer.parseInt(languageId);
        Optional<Language> languageOpt = languageRepository.findById(languageId);
        if (!languageOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Language not found");
        }
        Language language = languageOpt.get();

        List<Consonant> selectedConsonants = new ArrayList<>();
        for (Map.Entry<String, String> consonantEntry : consonants.entrySet()) {
            if (consonantEntry.getKey().equals("languageId")) {
                continue;
            }
            Integer consonantId = Integer.parseInt(consonantEntry.getKey());
            String consonantPresence = consonantEntry.getValue();

            if (consonantPresence.equals("true")) {
                Optional<Consonant> consonant = consonantRepository.findById(consonantId);
                if (consonant != null && !selectedConsonants.contains(consonant)) {
                    selectedConsonants.add(consonant.get());
                }
            }
        }

        if (selectedConsonants.isEmpty()) {
            return ResponseEntity.ok("Consonants could not be added.");
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
    @GetMapping("/language/allvowels")
    public ResponseEntity<Map<Integer, List<Vowel>>> getAllVowelLanguageJoinData() {
        List<VowelLanguageJoinDTO> returnList = vowelRepository.findLanguageVowelJoinData();
        Map<Integer, List<Vowel>> fullReturnList = new HashMap<>();
        for (VowelLanguageJoinDTO joinDTO : returnList) {
            Integer languageId = joinDTO.getLanguageId();
            Vowel vowel = vowelRepository.findById(joinDTO.getVowelId())
                    .orElseThrow(() -> new RuntimeException("Consonant not found with ID: " + joinDTO.getVowelId()));
            fullReturnList.putIfAbsent(languageId, new ArrayList<>());
            fullReturnList.get(languageId).add(vowel);
        }

        return ResponseEntity.ok(fullReturnList);
    }


    //Vowel data for specific language
    @GetMapping("/language/vowels/")
    public ResponseEntity<List<Vowel>> getAllVowelLanguageJoinDataByLanguage(@RequestParam(required=true) int id) {
        List<VowelLanguageJoinDTO> returnList = vowelRepository.findLanguageVowelJoinDataByLanguage(id);
        List<Vowel> vowels = new ArrayList<>();
        for (VowelLanguageJoinDTO joinDTO : returnList) {
            Optional<Vowel> optionalVowel = vowelRepository.findById(joinDTO.getVowelId());
            if (optionalVowel.isPresent()) {
            } else {
            }
            optionalVowel.ifPresent(vowels::add);
        }
        if (!vowels.isEmpty()) {
            return ResponseEntity.ok(vowels);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //All consonant data
    @GetMapping("/language/allconsonants")
    public ResponseEntity<Map<Integer, List<Consonant>>> getAllConsonantLanguageJoinData() {
        List<ConsonantLanguageJoinDTO> returnList = consonantRepository.findLanguageConsonantJoinData();
        System.out.println(returnList);
        Map<Integer, List<Consonant>> fullReturnList = new HashMap<>();
        for (ConsonantLanguageJoinDTO joinDTO : returnList) {
            Integer languageId = joinDTO.getLanguageId();
            Consonant consonant = consonantRepository.findById(joinDTO.getConsonantId())
                    .orElseThrow(() -> new RuntimeException("Consonant not found with ID: " + joinDTO.getConsonantId()));
            fullReturnList.putIfAbsent(languageId, new ArrayList<>());
            fullReturnList.get(languageId).add(consonant);
        }

        return ResponseEntity.ok(fullReturnList);
    }

    //Consonant data for specific language
    @GetMapping("/language/consonants/")
    public ResponseEntity<List<Consonant>> getAllConsonantLanguageJoinDataByLanguage(@RequestParam(required=true) int id) {
        List<ConsonantLanguageJoinDTO> returnList = consonantRepository.findLanguageConsonantJoinDataByLanguage(id);
        List<Consonant> consonants = new ArrayList<>();
        for (ConsonantLanguageJoinDTO joinDTO : returnList) {
            Optional<Consonant> optionalConsonant = consonantRepository.findById(joinDTO.getConsonantId());
            optionalConsonant.ifPresent(consonants::add);
        }
        if (!consonants.isEmpty()) {
            return ResponseEntity.ok(consonants);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
