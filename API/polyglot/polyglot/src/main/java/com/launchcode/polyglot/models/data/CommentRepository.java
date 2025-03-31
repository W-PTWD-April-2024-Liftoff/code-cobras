package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Comment;
import com.launchcode.polyglot.models.Language;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {
    List<Comment> findAll();
    Comment findCommentById(int id);
}
