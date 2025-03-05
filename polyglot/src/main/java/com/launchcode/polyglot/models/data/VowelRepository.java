package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Vowel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VowelRepository extends CrudRepository<Vowel, Integer> {
}
