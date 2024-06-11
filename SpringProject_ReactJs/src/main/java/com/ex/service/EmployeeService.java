package com.ex.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ex.entity.Employee;
import com.ex.entity.User;
import com.ex.repository.EmployeeRepository;
import com.ex.repository.UserRepository;

@Service
public class EmployeeService implements UserService {

	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	public Employee getEmpById(Long id) {
		return employeeRepository.findById(id).get();
	}

	public void saveEmp(Employee employee) {
		employeeRepository.save(employee);
	}

	public void updateEmp(Long id, Employee updatedEmployee) {
		Optional<Employee> optionalEmployee = employeeRepository.findById(id);

		if (optionalEmployee.isPresent()) {
			Employee employee = optionalEmployee.get();

			employee.setFirstName(updatedEmployee.getFirstName());
			employee.setLastName(updatedEmployee.getLastName());
			employee.setEmail(updatedEmployee.getEmail());

			employeeRepository.save(employee);
		}
	}

	public void deleteEmp(Long id) {
		employeeRepository.deleteById(id);
	}

	@Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User saveUser(User user) {
    	user.setRoles("ROLE_USER");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

	
	}

