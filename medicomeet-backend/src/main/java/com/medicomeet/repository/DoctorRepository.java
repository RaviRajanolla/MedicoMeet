package com.medicomeet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medicomeet.model.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long>  {

	
	 // Find doctor by name (exact match)
    List<Doctor> findByName(String name);

    // Find doctors whose specialization contains a keyword (e.g., "cardio")
    List<Doctor> findBySpecializationContainingIgnoreCase(String specialization);

    // Find doctor by email
    Doctor findByEmail(String email);
}
