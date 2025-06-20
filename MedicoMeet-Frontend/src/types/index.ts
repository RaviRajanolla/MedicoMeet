// Type definitions for the application

export interface Specialization {
  id: string;
  name: string;
  icon: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: Specialization;
  image: string;
  rating: number;
  reviewCount: number;
  education: string;
  experience: string;
  bio: string;
  languages: string[];
  consultationFee: number;
  availableDays: string[];
  availableTimeSlots: string[];
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  doctorId: string;
  userId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  doctorId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}