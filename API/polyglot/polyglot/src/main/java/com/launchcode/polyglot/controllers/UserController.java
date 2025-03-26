package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.exceptions.UserNotFoundException;
import com.launchcode.polyglot.models.User;
import com.launchcode.polyglot.models.data.UserRepository;
import com.launchcode.polyglot.models.dto.LoginFormDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/addprofile")
    public String newUser(@RequestBody LoginFormDTO newUser) {  //ResponseEntity<?>
        String returnMsg = "";

        User existingUser = userRepository.findByUsername(newUser.getUsername());

        if (existingUser != null) {
            returnMsg = "A user with that username already exists";
        }
        else {
            User newRegisterUser = new User(newUser.getUsername(), newUser.getEmail(), newUser.getBio(), newUser.getPassword());
            userRepository.save(newRegisterUser);
            //HttpHeaders headers = new HttpHeaders();
            //headers.add("Location", "http://localhost:5173");
            returnMsg = "Success";
        }
        return returnMsg;
        //return new ResponseEntity<>(returnMsg, HttpStatus.FOUND);  //headers
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginFormDTO newUser, HttpSession session) {


        try{

            User user = userRepository.findByUsername(newUser.getUsername());
            if(!user.getUsername().equals(newUser.getUsername())){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username");
            }

            if (!user.isMatchingPassword(newUser.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
            }
            session.setAttribute("user", newUser.getUsername());
            //return ResponseEntity.ok("Login was successful!");
            return ResponseEntity.ok(user.getUsername());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unknown error occurred");
        }
    }

    @GetMapping("/viewprofile/{id}")
    public User getUserById(@PathVariable int id) {
        return userRepository.findById(id).orElseThrow(()->new UserNotFoundException(id));
    }

    @PutMapping("/editprofile/{id}")
    public User editUser(@RequestBody User newUser, @PathVariable int id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setEmail(newUser.getEmail());
                    user.setBio(newUser.getBio());
                    return userRepository.save(user);
                }).orElseThrow(()->new UserNotFoundException(id));
    }

    @DeleteMapping("/viewprofile/{id}")
    public String deleteUser(@PathVariable int id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id "+id+" has been deleted successfully.";
    }
}
