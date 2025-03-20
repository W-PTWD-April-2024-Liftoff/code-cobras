package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Language;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepository extends CrudRepository<Language, Integer> {
    Language findByName(String name);
    List<Language> findAll();
}