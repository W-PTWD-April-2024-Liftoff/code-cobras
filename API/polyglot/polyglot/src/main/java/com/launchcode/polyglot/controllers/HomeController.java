package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.models.Comment;
import com.launchcode.polyglot.models.Connection;
import com.launchcode.polyglot.models.Language;
import com.launchcode.polyglot.models.Syllable;
import com.launchcode.polyglot.models.User;
import com.launchcode.polyglot.models.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    @Autowired
    private SyllableRepository syllableRepository;

    @Autowired
    private UserRepository userRepository;

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

    @GetMapping("/viewcomment")
    public ResponseEntity<List<Comment>> getPrivateCommentByLanguage(@RequestParam String languageName) {
        List<Comment> allComments = commentRepository.findAll();
        List<Comment> returnList = new ArrayList<>();
        returnList = allComments.stream()
                .filter(comment -> comment.getLanguageName().equals(languageName))
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

    @PostMapping(value = "/addcomment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addComment(
            @RequestParam("username") String username,
            @RequestParam("commentBody") String commentBody,
            @RequestParam("accessFlag") String accessFlag,
            @RequestParam("languageName") String languageName) {
        try {
            User user = userRepository.findByUsername(username);
            Language language = languageRepository.findByName(languageName.trim());

            if (user == null || language == null) {
                return ResponseEntity.badRequest().body("Invalid username or language name.");
            }

            Comment comment = new Comment();
            comment.setUsername(username);
            comment.setLanguageName(languageName);
            comment.setCommentBody(commentBody);
            comment.setAccessFlag(accessFlag);

            comment.setUser(user);
            comment.setLanguage(language);

            commentRepository.save(comment);
            return ResponseEntity.ok("Comment added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/favorite")
    public ResponseEntity<String> addFavorite(@RequestParam(required = true) String username,
                                              @RequestParam(required = true) String followType,
                                              @RequestParam(required = true) String followName) {
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
        Comment specificComment = commentRepository.findCommentById(id);
        if (specificComment == null) {
            return ResponseEntity.notFound().build();
        }
        specificComment.setCommentBody(updatedComment.getCommentBody());
        Comment savedComment = commentRepository.save(specificComment);

        return ResponseEntity.ok(savedComment);
    }

    @PutMapping("/editcomment/{id}")
    public ResponseEntity<String> updatePrivateComment(@PathVariable int id, @RequestBody String commentBody, @RequestBody String languageName) {
        List<Comment> comments = commentRepository.findAllByLanguageName(languageName);
        Comment specificComment = commentRepository.findCommentById(id);
        System.out.println(comments);
        System.out.println(specificComment);
        if (specificComment == null) {
            return ResponseEntity.notFound().build();
        }
        specificComment.setCommentBody(commentBody);
        commentRepository.save(specificComment);
        if (!comments.isEmpty()) {
            for (Comment comment : comments) {
                comment.setLanguageName(languageName);
                commentRepository.save(comment);
            }
            return ResponseEntity.ok("Comment(s) saved successfully");
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
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
