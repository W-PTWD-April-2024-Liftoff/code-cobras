package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Comment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {
    List<Comment> findByLanguageId(Long languageId);
    List<Comment> findAll();


}
