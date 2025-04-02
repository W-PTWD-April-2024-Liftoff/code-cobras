package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Language;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepository extends CrudRepository<Language, Integer> {
    @Query("SELECT l FROM Language l WHERE LOWER(l.name) = LOWER(:name)")
    Language findByName(@Param("name")String name);
    List<Language> findAll();
    List<Language> findAllByUsername(String username);
}