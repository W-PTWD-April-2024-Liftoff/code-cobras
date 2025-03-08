package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Consonant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsonantRepository extends CrudRepository<Consonant,Integer> {
}
