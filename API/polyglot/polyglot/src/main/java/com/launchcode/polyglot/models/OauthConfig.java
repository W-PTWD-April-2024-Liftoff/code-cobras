//package com.launchcode.polyglot.models;
//
//import lombok.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class OauthConfig {
//    @Value("${GOOGLE_CLIENT_ID}")
//    private String clientId;
//
//    @Value("${GOOGLE_CLIENT_SECRET}")
//    private String clientSecret;
//
//    @Value("${GOOGLE_REDIRECT_URI}")
//    private String redirectUri;

//    @Bean
//    public OAuthProperties oauthProperties() {
//        return new OAuthProperties(clientId, clientSecret, redirectUri);
//    }
//    public record OAuthProperties(
//            String clientId,
//            String clientSecret,
//            String redirectUri
//
//    )

//}
//

