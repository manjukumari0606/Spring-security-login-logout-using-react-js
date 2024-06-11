package com.ex.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SpringSecurity {

	@Autowired
	private JwtAuthFilter authFilter;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//	        http.csrf(csrf -> csrf.disable())
//	            .authorizeHttpRequests(authorizeRequests -> {
//					try {
//						authorizeRequests
//						    .requestMatchers("/api/register", "/api/login","/employee/delete/**", "/employee/edit/**", "/employee/save", "/employee", "/employee/**").permitAll()
//						    .requestMatchers("/employee/delete/**", "/employee/edit/**", "/employee/save", "/employee", "/employee/**")
//						    .hasAnyAuthority("USER")
//						    .anyRequest().authenticated().and()
//						    .sessionManagement()
//						    .sessionFixation().newSession() // Use a new session for each login
//						    .invalidSessionUrl("/login?expired") // Redirect to login page if session is invalid or expired
//						    .maximumSessions(1) // Allow only one session per user
//						    .expiredUrl("/login?sessionExpired");
//					} catch (Exception e) {
//						// TODO Auto-generated catch block
//						e.printStackTrace();
//					}
//				} // Redirect to login page if user tries to create a new session
//	                
//	            )
//	            
//	            .httpBasic();
//	        return http.build();

		return http.csrf().disable().authorizeHttpRequests()
				.requestMatchers("/api/login", "/api/register", "/api/authenticate", "/employee", "/employee/**",
						"/employee/delete/**", "/employee/edit/**", "/employee/save")
				.permitAll().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class).build();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(customUserDetailsService);
		;
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}



}