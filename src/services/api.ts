// Mock API service

import { Doctor, Appointment, Specialization } from '../types';

// Mock data for specializations
const specializations: Specialization[] = [
  { id: '1', name: 'Cardiology', icon: 'Heart' },
  { id: '2', name: 'Dermatology', icon: 'Sparkles' },
  { id: '3', name: 'Neurology', icon: 'Brain' },
  { id: '4', name: 'Pediatrics', icon: 'Baby' },
  { id: '5', name: 'Orthopedics', icon: 'Bone' },
  { id: '6', name: 'Psychiatry', icon: 'Smile' },
  { id: '7', name: 'Ophthalmology', icon: 'Eye' },
  { id: '8', name: 'Gynecology', icon: 'UserPlus' },
];

// Mock data for doctors
const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: specializations[0],
    image: 'https://images.pexels.com/photos/5214961/pexels-photo-5214961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviewCount: 124,
    education: 'MD, Harvard Medical School',
    experience: '15 years',
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with 15 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.',
    languages: ['English', 'Spanish'],
    consultationFee: 150,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: specializations[2],
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviewCount: 89,
    education: 'MD, Johns Hopkins University',
    experience: '12 years',
    bio: 'Dr. Michael Chen is a neurologist specializing in movement disorders and neurodegenerative diseases. He completed his residency at Mayo Clinic and fellowship at Johns Hopkins Hospital.',
    languages: ['English', 'Mandarin'],
    consultationFee: 180,
    availableDays: ['Tuesday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['08:00 AM', '09:00 AM', '10:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'],
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: specializations[3],
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    reviewCount: 156,
    education: 'MD, Stanford University',
    experience: '10 years',
    bio: 'Dr. Emily Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence. She has a special interest in childhood development and preventive care.',
    languages: ['English', 'Spanish'],
    consultationFee: 120,
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'],
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: specializations[4],
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.6,
    reviewCount: 103,
    education: 'MD, University of Pennsylvania',
    experience: '18 years',
    bio: 'Dr. James Wilson is an experienced orthopedic surgeon specializing in sports medicine and joint replacement. He has worked with several professional sports teams and has performed over 1,000 successful surgeries.',
    languages: ['English'],
    consultationFee: 200,
    availableDays: ['Monday', 'Tuesday', 'Thursday'],
    availableTimeSlots: ['08:00 AM', '09:00 AM', '10:00 AM', '01:00 PM', '02:00 PM'],
  },
  {
    id: '5',
    name: 'Dr. Amara Patel',
    specialization: specializations[1],
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviewCount: 78,
    education: 'MD, Yale School of Medicine',
    experience: '8 years',
    bio: 'Dr. Amara Patel is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology. She has expertise in treating conditions like acne, eczema, psoriasis, and skin cancer.',
    languages: ['English', 'Hindi', 'Gujarati'],
    consultationFee: 170,
    availableDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    availableTimeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM'],
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialization: specializations[5],
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviewCount: 91,
    education: 'MD, Columbia University',
    experience: '14 years',
    bio: 'Dr. Robert Kim is a psychiatrist with expertise in mood disorders, anxiety, and PTSD. He takes a holistic approach to mental health, combining evidence-based treatments with lifestyle modifications.',
    languages: ['English', 'Korean'],
    consultationFee: 160,
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    availableTimeSlots: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
  },
];

// Mock appointments data
let appointments: Appointment[] = [];

// API functions

// Get all specializations
export const getSpecializations = async (): Promise<Specialization[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return specializations;
};

// Get all doctors
export const getDoctors = async (): Promise<Doctor[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return doctors;
};

// Get doctors by specialization
export const getDoctorsBySpecialization = async (specializationId: string): Promise<Doctor[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return doctors.filter(doctor => doctor.specialization.id === specializationId);
};

// Get doctor by ID
export const getDoctorById = async (id: string): Promise<Doctor | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  return doctors.find(doctor => doctor.id === id) || null;
};

// Book appointment
export const bookAppointment = async (appointmentData: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Promise<Appointment> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newAppointment: Appointment = {
    id: Math.random().toString(36).substring(2, 9),
    ...appointmentData,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  
  appointments.push(newAppointment);
  return newAppointment;
};

// Get user appointments
export const getUserAppointments = async (userId: string): Promise<Appointment[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return appointments
    .filter(appointment => appointment.userId === userId)
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());
};

// Cancel appointment
export const cancelAppointment = async (appointmentId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const appointmentIndex = appointments.findIndex(appointment => appointment.id === appointmentId);
  
  if (appointmentIndex !== -1) {
    appointments[appointmentIndex].status = 'cancelled';
    return true;
  }
  
  return false;
};

// For admin dashboard - Get all appointments
export const getAllAppointments = async (): Promise<Appointment[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 900));
  
  return appointments.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Send contact form
export const submitContactForm = async (formData: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Always return success in this mock
  return {
    success: true,
    message: 'Your message has been sent successfully. We will get back to you soon!'
  };
};