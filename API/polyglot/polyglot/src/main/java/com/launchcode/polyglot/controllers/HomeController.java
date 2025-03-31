package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.models.Comment;
import com.launchcode.polyglot.models.Connection;
import com.launchcode.polyglot.models.Language;
import com.launchcode.polyglot.models.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173",
        allowCredentials = "true",
        maxAge = 10000)
@RestController
@RequestMapping("/")
public class HomeController {

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ConnectionRepository connectionRepository;

    @Autowired
    private VowelRepository vowelRepository;

    @Autowired
    private ConsonantRepository consonantRepository;

    @GetMapping
    public ResponseEntity<List<Language>> getAllLanguages() {
        List<Language> allLanguages = languageRepository.findAll();
        List<Language> returnList = new ArrayList<>();
        returnList = allLanguages.stream()
                    .filter(language -> language.getAccessFlag().equals("public"))
                    .collect(Collectors.toList());

        if (returnList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return ResponseEntity.ok(returnList);
        }
    }

    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getAllComments(@RequestParam String accessFlag) {
        List<Comment> allComments = commentRepository.findAll();
        List<Comment> returnList = new ArrayList<>();
        returnList = allComments.stream()
                .filter(comment -> comment.getAccessFlag().equals(accessFlag))
                .collect(Collectors.toList());

        if (returnList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return ResponseEntity.ok(returnList);
        }
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<Connection>> getAllConnectionsByUsername(@RequestParam String username) {
        List<Connection> allConnections = connectionRepository.findAll();
        List<Connection> returnList = new ArrayList<>();
        returnList = allConnections.stream()
                .filter(comment -> comment.getUsername().equals(username))
                .collect(Collectors.toList());

        if (returnList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return ResponseEntity.ok(returnList);
        }
    }

    @PostMapping("/addcomment")
    public ResponseEntity<String> addComment(@RequestParam(required = true) String username,
                                       @RequestParam(required = true) String commentBody,
                                       @RequestParam(required = true) String accessFlag,
                                       @RequestParam(required = true) String languageName) {

        try {
            Comment comment = new Comment();
            comment.setUsername(username);
            comment.setCommentBody(commentBody);
            comment.setAccessFlag(accessFlag);
            comment.setLanguageName(languageName);
            commentRepository.save(comment);
            return ResponseEntity.ok("Comment added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/favorite")
    public ResponseEntity<String> addFavorite(@RequestParam(required = true) String username,
                                              @RequestParam(required = true) String followType,
                                              @RequestParam(required=true) String followName) {
        try {
            Connection connection = new Connection();
            connection.setUsername(username);
            connection.setFollowType(followType);
            connection.setFollowName(followName);
            connectionRepository.save(connection);
            return ResponseEntity.ok("Connection added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/comment/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable int id, @RequestBody Comment updatedComment) {
        Comment existingComment = commentRepository.findCommentById(id);
        if (existingComment == null) {
            return ResponseEntity.notFound().build();
        }
        existingComment.setCommentBody(updatedComment.getCommentBody());
        Comment savedComment = commentRepository.save(existingComment);

        return ResponseEntity.ok(savedComment);
    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<String> deleteLanguage(@PathVariable int id) {
        if (!commentRepository.existsById(id)) {
            return ResponseEntity.ok("Comment could not be deleted because it was not found");
        }
        commentRepository.deleteById(id);
        return ResponseEntity.ok("Delete Successful");
    }

    @DeleteMapping("/favorite/{id}")
    public ResponseEntity<String> deleteFavorite(@PathVariable int id) {
        if (!connectionRepository.existsById(id)) {
            return ResponseEntity.ok("Connection could not be deleted because it was not found");
        }
        connectionRepository.deleteById(id);
        return ResponseEntity.ok("Delete Successful");
    }
}
