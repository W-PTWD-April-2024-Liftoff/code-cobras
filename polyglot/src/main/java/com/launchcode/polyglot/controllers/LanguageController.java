package com.launchcode.polyglot.controllers;

import com.launchcode.polyglot.models.data.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class LanguageController {

    @Autowired
    private LanguageRepository languageRepository;


}
