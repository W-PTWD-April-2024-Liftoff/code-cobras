package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Syllable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SyllableRepository extends CrudRepository<Syllable, Integer> {
}
