package com.launchcode.polyglot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableWebSecurity
@Configuration
public class PolyglotApplication {
	public static void main(String[] args) {
		SpringApplication.run(PolyglotApplication.class, args);
	}

	@Bean
    public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
				public void addCorsMappings (CorsRegistry registry){
					registry.addMapping("/**")
							.allowedOrigins("http://localhost:5173", "http://localhost:5174")  // Allow React frontend
							.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
							.allowCredentials(true);
				}
			}

			;
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder(){
		return  new BCryptPasswordEncoder();
	}

	@Autowired
	private UserDetailsService userDetailsService;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, ClientRegistrationRepository clientRegistrationRepository) throws Exception {
		http
				.csrf(AbstractHttpConfigurer::disable)
				.cors(Customizer.withDefaults())
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers("/login").permitAll()
						.requestMatchers("/*").permitAll()
						.requestMatchers("/addprofile").permitAll()
						.requestMatchers("/languages").permitAll()
						.requestMatchers("/language/allvowels").permitAll()
						.requestMatchers("/language/allconsonants").permitAll()
						.requestMatchers("/language/allsyllables").permitAll()
						.requestMatchers("/language/vowels/*").permitAll()
						.requestMatchers("/language/consonants/*").permitAll()
						.requestMatchers("/language/syllable/*").permitAll()
						.requestMatchers("/addlanguage").permitAll()
						.requestMatchers("/addlanguage/vowels/*").permitAll()
						.requestMatchers("/addlanguage/consonants/*").permitAll()
						.requestMatchers("/addlanguage/syllable/*").permitAll()
						.requestMatchers("/viewlanguage").permitAll()
						.requestMatchers("/editlanguage/*").permitAll()
						.requestMatchers("/editlanguage/vowels/*").permitAll()
						.requestMatchers("/editlanguage/consonants/*").permitAll()
						.requestMatchers("/editlanguage/syllable").permitAll()
						.requestMatchers("/comments/*").permitAll()
						.requestMatchers("/comment/*").permitAll()
						.requestMatchers("/addcomment/*").permitAll()
						.requestMatchers("/editcomment/*").permitAll()
						.requestMatchers("/deletelanguage/*").permitAll()
						.requestMatchers("/viewcomment/*").permitAll()
						.requestMatchers("/viewprofile/*").permitAll()
						.requestMatchers("/editprofile/*").permitAll()
						.anyRequest().authenticated()
				)
				.oauth2Login(oauth2 -> oauth2
						.failureHandler((request, response, exception) -> {
							exception.printStackTrace();
							response.sendRedirect("/login?error=" + exception.getMessage());
						})
						.loginPage("/login")
						.defaultSuccessUrl("http://localhost:5173", true)
						.successHandler(((request, response, authentication) ->
								response.sendRedirect("http://localhost:5173")
						))
						.authorizationEndpoint(authorization -> authorization
								.baseUri("/oauth2/authorization")
						)
						.redirectionEndpoint(redirection -> redirection
								.baseUri("/login/oauth2/code/google"))

				)
//				.oauth2Login(oauth2 -> oauth2
//						.authorizationEndpoint(authorization -> authorization
//								.baseUri(OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI)
//						)
//						.redirectionEndpoint(redirection -> redirection
//								.baseUri("/oauth2/callback/*")
//						)
//						.defaultSuccessUrl("http://localhost:5173", true)
//				)
				.logout(logout -> logout
						.logoutSuccessUrl("http://localhost:5173")
						.invalidateHttpSession(true)
						.clearAuthentication(true)
						.deleteCookies("JSESSIONID")
				)
				.httpBasic(Customizer.withDefaults());
		return http.build();
	}

	@Bean
	public AuthenticationProvider authenticationProvider(){
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(bCryptPasswordEncoder());
		return  provider;
	}
}

