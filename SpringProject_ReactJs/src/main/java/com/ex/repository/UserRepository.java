package com.ex.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ex.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	User findByEmail(String email);

	Optional<User> findOneByEmailAndPassword(String email, String encodedPassword);

}
