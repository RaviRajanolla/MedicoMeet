package com.medicomeet.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "doctors")
public class Doctor {
		
	
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false)
	    private String name;

	    @Column(nullable = false)
	    private String specialization;

	    @Column(nullable = false, unique = true)
	    private String email;

	    @Column(nullable = false)
	    private String phone;

		public Doctor(Long id, String name, String specialization, String email, String phone) {
			super();
			this.id = id;
			this.name = name;
			this.specialization = specialization;
			this.email = email;
			this.phone = phone;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getSpecialization() {
			return specialization;
		}

		public void setSpecialization(String specialization) {
			this.specialization = specialization;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPhone() {
			return phone;
		}

		public void setPhone(String phone) {
			this.phone = phone;
		}

		public Object getContact() {
			// TODO Auto-generated method stub
			return null;
		}

		public void setContact(Object contact) {
			// TODO Auto-generated method stub
			
		}

		public Object getExperience() {
			// TODO Auto-generated method stub
			return null;
		}

		public void setExperience(Object experience) {
			// TODO Auto-generated method stub
			
		}

		public Object getContact1() {
			// TODO Auto-generated method stub
			return null;
		}

		public Object getExperience1() {
			// TODO Auto-generated method stub
			return null;
		}
	    
	    
	}


