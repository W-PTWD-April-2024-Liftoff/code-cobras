package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Vowel;
import com.launchcode.polyglot.models.dto.VowelLanguageJoinDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VowelRepository extends CrudRepository<Vowel, Integer> {
    List<Vowel> findAllByName(String name);
    Vowel findByName(String name);
    List<Vowel> findAll();
    Vowel findByUnicode(String unicode);

    @Query("SELECT v FROM Vowel v")
    List<Vowel> findAllVowels();

    @Query(value = "SELECT l.id, v.id FROM language l " +
            "JOIN language_vowel lv ON l.id = lv.language_id " +
            "JOIN vowel v ON v.id = lv.vowel_id", nativeQuery = true)
    List<VowelLanguageJoinDTO> findLanguageVowelJoinData();

    @Query(value = "SELECT l.id, v.id FROM language l " +
            "JOIN language_vowel lv ON l.id = lv.language_id " +
            "JOIN vowel v ON v.id = lv.vowel_id WHERE l.id = :languageId", nativeQuery = true)
    List<VowelLanguageJoinDTO> findLanguageVowelJoinDataByLanguage(int languageId);
}
