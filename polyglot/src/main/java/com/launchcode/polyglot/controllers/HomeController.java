package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.models.dto.RegisterFormDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String displayHome(Model model) {
        model.addAttribute(new RegisterFormDTO());
        model.addAttribute("title", "Home");
        return "home";
    }
}
