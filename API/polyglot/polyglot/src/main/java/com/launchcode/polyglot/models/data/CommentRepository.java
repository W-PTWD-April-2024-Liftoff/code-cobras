package com.launchcode.polyglot.models.data;

import com.launchcode.polyglot.models.Comment;
import com.launchcode.polyglot.models.Language;
import org.springframework.data.jpa.repository.Query;
import com.launchcode.polyglot.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {
    List<Comment> findByLanguage(Language language);
    List<Comment> findByUser(User user);
    List<Comment> findAll();
    Comment findCommentById(int id);
    Comment findCommentByLanguageName(String languageName);
    List<Comment> findAllByLanguageName(String languageName);

    @Query(value="SELECT * FROM comment WHERE access_flag = 'private' AND language_name = :languageName", nativeQuery=true)
    Comment findByAccessFlagAndLanguageName(String languageName);
}
