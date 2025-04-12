package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Consonant;
import com.launchcode.polyglot.models.dto.ConsonantLanguageJoinDTO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ConsonantRepository extends CrudRepository<Consonant,Integer> {
    List<Consonant> findAllByName(String name);
    Consonant findByName(String name);
    List<Consonant> findAll();
    Consonant findByUnicode(String unicode);

    @Query(value = "SELECT l.id, c.id FROM language l " +
            "JOIN language_consonant lc ON l.id = lc.language_id " +
            "JOIN consonant c ON c.id = lc.consonant_id", nativeQuery = true)
    List<ConsonantLanguageJoinDTO> findLanguageConsonantJoinData();

    @Query(value = "SELECT l.id, c.id FROM language l " +
            "JOIN language_consonant lc ON l.id = lc.language_id " +
            "JOIN consonant c ON c.id = lc.consonant_id WHERE l.id = :languageId", nativeQuery = true)
    List<ConsonantLanguageJoinDTO> findLanguageConsonantJoinDataByLanguage(int languageId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM language_consonant WHERE language_id = :languageId AND consonant_id = :consonantId", nativeQuery = true)
    void deleteConsonantLanguageJoin(@Param("languageId") int languageId, @Param("consonantId") int consonantId);
}
