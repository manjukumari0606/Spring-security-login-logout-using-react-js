package com.ex.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ex.dto.AuthResponse;
import com.ex.entity.User;
import com.ex.repository.UserRepository;
import com.ex.service.UserService;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api")
public class AuthController {

	private UserService userService;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private com.ex.service.JwtService jwtService;

    @Autowired
    public AuthController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // handler method to handle user registration form submit request
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return "Email already exists";
        }
        userService.saveUser(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.ok().body("Login successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
    
//    @PostMapping("/authenticate")
//	public String authenticateAndGetToken(@RequestBody User user) {  // to generate a token
//		
//	Authentication authentication= 	authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
//		if(authentication.isAuthenticated()) {
//			return jwtService.generateToken(user.getEmail());
//			
//		}else {
//		throw new UsernameNotFoundException("Invalid User request");
//		
//	}
//}
    
    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticateAndGetToken(@RequestBody User user) { // Return ResponseEntity for better control over the response

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            // Generate token
            String token = jwtService.generateToken(user.getEmail());

            // Load user details from the database
            User authenticatedUser = userRepository.findByEmail(user.getEmail());
            if (authenticatedUser == null) {
                throw new UsernameNotFoundException("User not found in the database");
            }

            // Create response object
            AuthResponse authResponse = new AuthResponse(token, authenticatedUser);

            return ResponseEntity.ok(authResponse);
        } else {
            throw new UsernameNotFoundException("Invalid User request");
        }
    }

}

