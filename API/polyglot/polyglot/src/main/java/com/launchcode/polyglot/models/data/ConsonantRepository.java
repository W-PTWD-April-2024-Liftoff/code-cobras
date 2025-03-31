package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Consonant;
import com.launchcode.polyglot.models.dto.ConsonantLanguageJoinDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsonantRepository extends CrudRepository<Consonant,Integer> {
    public List<Consonant> findAllByName(String name);
    public Consonant findByName(String name);
    public List<Consonant> findAll();

    @Query(value = "SELECT c.id, l.id FROM language l " +
            "JOIN language_consonant lc ON l.id = lc.language_id " +
            "JOIN consonant c ON c.id = lc.consonant_id", nativeQuery = true)
    List<ConsonantLanguageJoinDTO> findLanguageConsonantJoinData();

    @Query(value = "SELECT c.id, l.id FROM language l " +
            "JOIN language_consonant lc ON l.id = lc.language_id " +
            "JOIN consonant c ON c.id = lc.consonant_id WHERE l.id = :languageId", nativeQuery = true)
    List<ConsonantLanguageJoinDTO> findLanguageConsonantJoinDataByLanguage(int languageId);
}
