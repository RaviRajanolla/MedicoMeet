package com.medicomeet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicomeet.model.Doctor;
import com.medicomeet.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService {
	
	@Autowired
    private DoctorRepository doctorRepository;
	private Doctor updatedDoctor;

	@Override
	public List<Doctor> getAllDoctors() {
		// TODO Auto-generated method stub
		return doctorRepository.findAll();
	}

	@Override
	public Doctor getDoctorById(Long id) {
		// TODO Auto-generated method stub
		return doctorRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
	}

	@Override
	public Doctor saveDoctor(Doctor doctor) {
		// TODO Auto-generated method stub
		return doctorRepository.save(doctor);
	}

	@Override
	public Doctor updateDoctor(Long id, Doctor doctor) {
		// TODO Auto-generated method stub
		 Doctor existingDoctor = doctorRepository.findById(id)
		            .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
		        
		        existingDoctor.setName(updatedDoctor.getName());
		        existingDoctor.setSpecialization(updatedDoctor.getSpecialization());
		        existingDoctor.setContact(updatedDoctor.getContact());
		        existingDoctor.setExperience(((Doctor) updatedDoctor).getExperience());
		return doctorRepository.save(existingDoctor);
	}

	@Override
	public void deleteDoctor(Long id) {
		// TODO Auto-generated method stub
		
		 doctorRepository.deleteById(id);
	}

}


