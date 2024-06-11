package com.ex.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ex.entity.Employee;
import com.ex.service.EmployeeService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EmpController {
	
	@Autowired
	private EmployeeService empService;
	
	
	@GetMapping
	@PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
	public List<Employee> getAllEmployee( ) {
	   return empService.getAllEmployees();
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Employee> getEmployeebyId(@PathVariable Long id) {
		return new ResponseEntity<Employee>(empService.getEmpById(id), HttpStatus.OK);
	}

	@PostMapping("/save")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String saveEmp(@RequestBody Employee employee) {
		empService.saveEmp(employee);
		 new ResponseEntity<Void>(HttpStatus.OK);
		 return "employee addedd successfully";
	}
	
	@PutMapping("/edit/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String UpdateEmp(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
		empService.updateEmp(id, updatedEmployee);
		return "employee updated successfully..";
	}

	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String deleteEmp(@PathVariable Long id) {
		empService.deleteEmp(id);
		 new ResponseEntity<Void>(HttpStatus.OK);
		 return "employee deleted successfully";
	}

}
