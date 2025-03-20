package com.launchcode.polyglot.controllers;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    @Value("${GOOGLE_CLIENT_ID}")
    private String clientId;

    @Value("${GOOGLE_CLIENT_SECRET}")
    private String clientSecret;

    @Value("${GOOGLE_REDIRECT_URI}")
    private String redirectUri;

    private static final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

    @PostMapping("/callback")
    public ResponseEntity<Map<String, String>> handleCallback(@RequestBody Map<String, String> request){
        String code = request.get("code");

        if(code==null || code.isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("error", "Authorization code is missing"));

        }

        String accessToken = exchangeCodeForToken(code);

        if (accessToken == null) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to exchange code for token"));
        }

        Map<String, String> response = new HashMap<>();
        response.put("accessToken", accessToken);
        return ResponseEntity.ok(response);
    }

    private String exchangeCodeForToken(String code){
        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("code", code);
        requestBody.put("client_id", clientId);
        requestBody.put("client_secret", clientSecret);
        requestBody.put("redirect_uri", redirectUri);
        requestBody.put("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        //create http entity

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        //send post request to googles token endpoint
        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    GOOGLE_TOKEN_URL,
                    HttpMethod.POST,
                    requestEntity,
                    Map.class
            );
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() !=null){
                return (String) response.getBody().get("access_token");

            } else {
                System.err.println("Failed to exchange code for token. Response: " +
                        response.getBody());
                return null;
            }
        } catch (Exception e){
            System.err.println("Error exchanging code for token:");
            e.printStackTrace();
            return null;
        }

    }
}
