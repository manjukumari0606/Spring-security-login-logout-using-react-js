package com.ex.config;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ex.entity.User;
import com.ex.repository.UserRepository;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
        @Override
        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
            User user = userRepository.findByEmail(email);

            if (user != null) {
                return new CustomUserDetails(user.getEmail(), user.getPassword(),
                        mapRolesToAuthorities(user.getRoles()), user.getFirstName());
            } else {
                throw new UsernameNotFoundException("Invalid username or password.");
            }
        }

    private Collection<SimpleGrantedAuthority> mapRolesToAuthorities(String roles) {
        List<SimpleGrantedAuthority> authorities = Arrays.stream(roles.split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        return authorities;
    }
    
   
}