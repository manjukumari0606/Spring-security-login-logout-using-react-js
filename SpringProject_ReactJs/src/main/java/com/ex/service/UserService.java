package com.ex.service;

import com.ex.entity.User;

public interface UserService {

	User findByEmail(String email);

	User saveUser(User user);

	
}