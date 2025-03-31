package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Connection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConnectionRepository extends CrudRepository<Connection,Integer> {
    List<Connection> findAll();
}
