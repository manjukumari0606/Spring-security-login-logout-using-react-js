package com.ex.dto;

import com.ex.entity.User;

public class AuthResponse {
    private String token;
    private User user; // Assuming you have a User entity with necessary fields

    // Constructors, getters, and setters
    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
