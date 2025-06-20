package com.medicomeet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicomeet.model.Doctor;
import com.medicomeet.service.DoctorService;

//@CrossOrigin(origins = "http://localhost:5173") // allows frontend access from any domain (React/Vite frontend)
@RestController
@RequestMapping("/api/doctors")

public class DoctorController {

	
	 @Autowired
	    private DoctorService doctorService;

	    // 🔹 CREATE doctor
	    @PostMapping
	    public Doctor saveDoctor(@RequestBody Doctor doctor) {
	        return doctorService.saveDoctor(doctor);
	    }

	    // 🔹 READ all doctors
	    @GetMapping
	    public List<Doctor> getAllDoctors() {
	        return doctorService.getAllDoctors();
	    }

	    // 🔹 READ doctor by ID
	    @GetMapping("/{id}")
	    public Doctor getDoctorById(@PathVariable Long id) {
	        return doctorService.getDoctorById(id);
	    }

	    // 🔹 UPDATE doctor
	    @PutMapping("/{id}")
	    public Doctor updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
	        return doctorService.updateDoctor(id, doctor);
	    }

	    // 🔹 DELETE doctor
	    @DeleteMapping("/{id}")
	    public String deleteDoctor(@PathVariable Long id) {
	        doctorService.deleteDoctor(id);
	        return "Doctor with ID " + id + " deleted successfully.";
	    }
}
