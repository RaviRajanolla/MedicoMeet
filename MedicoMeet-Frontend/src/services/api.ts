// Mock API service
import axios from 'axios';
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

// Enhanced mock data for doctors with more entries
const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Keerthi',
    specialization: specializations[0],
    image: 'https://img.freepik.com/free-photo/attractive-medical-professional-uniform-standing-with-arms-crossed-against-isolated-background_662251-416.jpg?ga=GA1.1.740885608.1748072649&w=740',
    rating: 5,
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
    name: 'Dr. Saurabh Raj',
    specialization: specializations[2],
    image: 'https://t4.ftcdn.net/jpg/03/20/52/31/360_F_320523164_tx7Rdd7I2XDTvvKfz2oRuRpKOPE5z0ni.jpg',
    rating: 5,
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
    name: 'Dr. Saanvi',
    specialization: specializations[3],
    image: 'https://media.istockphoto.com/id/1293373291/photo/portrait-of-confident-ethnic-female-doctor.jpg?s=612x612&w=0&k=20&c=CJsw6IgTecJZoBeVXqZdvh2BI-NyVa-8VcQM3fPhbYc=',
    rating: 5,
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
    name: 'Dr. Tanmayi',
    specialization: specializations[4],
    image: 'https://img.freepik.com/premium-photo/male-female-doctor-portrait-healthcare-medical-staff-concept-confident-doctor-portrait_71956-34365.jpg?ga=GA1.1.740885608.1748072649&w=740',
    rating: 5,
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
    name: 'Dr. Paanchali',
    specialization: specializations[1],
    image: 'https://t3.ftcdn.net/jpg/05/85/85/10/360_F_585851080_bl0NqsZWOfoNFBS58Uka2D6BjJidRSo2.jpg',
    rating: 5,
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
    name: 'Dr. Aditi',
    specialization: specializations[5],
    image: 'https://t4.ftcdn.net/jpg/06/47/16/29/360_F_647162966_SFu8GP6awkeW0OnFnAxPjiGXSoeme4ht.jpg',
    rating: 5,
    reviewCount: 91,
    education: 'MD, Columbia University',
    experience: '14 years',
    bio: 'Dr. Robert Kim is a psychiatrist with expertise in mood disorders, anxiety, and PTSD. He takes a holistic approach to mental health, combining evidence-based treatments with lifestyle modifications.',
    languages: ['English', 'Korean'],
    consultationFee: 160,
    availableDays: ['Monday', 'Wednesday', 'Thursday'],
    availableTimeSlots: ['10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
  },
  {
    id: '7',
    name: 'Dr. Mira',
    specialization: specializations[6],
    image: 'https://st3.depositphotos.com/1158045/12792/i/450/depositphotos_127921332-smiling-nurse-in-a-hospital.jpg',
    rating: 5,
    reviewCount: 67,
    education: 'MD, University of California',
    experience: '11 years',
    bio: 'Dr. Lisa Thompson is an ophthalmologist specializing in retinal diseases and cataract surgery. She has performed over 2,000 successful eye surgeries and is known for her precision and patient care.',
    languages: ['English', 'French'],
    consultationFee: 175,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['08:30 AM', '09:30 AM', '10:30 AM', '01:30 PM', '02:30 PM', '03:30 PM'],
  },
  {
    id: '8',
    name: 'Dr. Sahara',
    specialization: specializations[7],
    image: 'https://studymedic.com/wp-content/uploads/2024/12/photo_2024-12-18_09-48-23-850x600.jpg',
    rating: 5,
    reviewCount: 142,
    education: 'MD, University of Miami',
    experience: '16 years',
    bio: 'Dr. Maria Garcia is a gynecologist with extensive experience in women\'s health, prenatal care, and minimally invasive surgery. She is passionate about providing comprehensive care for women of all ages.',
    languages: ['English', 'Spanish', 'Portuguese'],
    consultationFee: 165,
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    availableTimeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'],
  },
  {
    id: '9',
    name: 'Dr. Abhay',
    specialization: specializations[0],
    image: 'https://media.istockphoto.com/id/1346124900/photo/confident-successful-mature-doctor-at-hospital.jpg?s=612x612&w=0&k=20&c=S93n5iTDVG3_kJ9euNNUKVl9pgXTOdVQcI_oDGG-QlE=',
    rating:5,
    reviewCount: 98,
    education: 'MD, Duke University',
    experience: '13 years',
    bio: 'Dr. David Lee is a cardiologist specializing in interventional cardiology and cardiac catheterization. He has expertise in treating complex coronary artery disease and heart valve disorders.',
    languages: ['English', 'Korean'],
    consultationFee: 185,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['08:00 AM', '09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM'],
  },
  {
    id: '10',
    name: 'Dr. Arjun',
    specialization: specializations[1],
    image: 'https://media.istockphoto.com/id/682134088/photo/im-the-best-at-what-i-do.jpg?s=612x612&w=0&k=20&c=l2GJ-20Yn0WLcd0Xt-TVL5IsHogBOx2n2ULWsoryLEQ=',
    rating: 5,
    reviewCount: 115,
    education: 'MD, Northwestern University',
    experience: '9 years',
    bio: 'Dr. Jennifer Adams is a dermatologist specializing in pediatric dermatology and skin cancer prevention. She is dedicated to helping patients maintain healthy skin throughout their lives.',
    languages: ['English'],
    consultationFee: 155,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'],
  },
  {
    id: '11',
    name: 'Dr. Pooja',
    specialization: specializations[2],
    image: 'https://img.freepik.com/premium-photo/male-female-doctor-portrait-healthcare-medical-staff-concept-confident-doctor-portrait_71956-34139.jpg?ga=GA1.1.740885608.1748072649&w=740',
    rating: 5,
    reviewCount: 73,
    education: 'MD, University of Chicago',
    experience: '12 years',
    bio: 'Dr. Ahmed Hassan is a neurologist with expertise in epilepsy and sleep disorders. He uses the latest diagnostic techniques and treatment approaches to help patients manage neurological conditions.',
    languages: ['English', 'Arabic'],
    consultationFee: 170,
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    availableTimeSlots: ['08:30 AM', '09:30 AM', '10:30 AM', '01:30 PM', '02:30 PM'],
  },
  {
    id: '12',
    name: 'Dr. Anvi',
    specialization: specializations[3],
    image: 'https://img.freepik.com/premium-photo/male-female-doctor-portrait-healthcare-medical-staff-concept-confident-doctor-portrait_71956-33586.jpg?ga=GA1.1.740885608.1748072649&w=740',
    rating: 5,
    reviewCount: 187,
    education: 'MD, Boston University',
    experience: '14 years',
    bio: 'Dr. Rachel Green is a pediatrician with a focus on adolescent medicine and childhood obesity prevention. She works closely with families to promote healthy lifestyle choices for children.',
    languages: ['English', 'German'],
    consultationFee: 140,
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    availableTimeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
  },
];

// Mock appointments data with some sample appointments
let appointments: Appointment[] = [
  {
    id: 'apt1',
    doctorId: '1',
    userId: '2',
    patientName: 'John Doe',
    patientEmail: 'john.doe@example.com',
    patientPhone: '+1 (555) 123-4567',
    appointmentDate: '2024-01-15',
    appointmentTime: '10:00 AM',
    reason: 'Regular checkup',
    status: 'confirmed',
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'apt2',
    doctorId: '3',
    userId: '2',
    patientName: 'Jane Smith',
    patientEmail: 'jane.smith@example.com',
    patientPhone: '+1 (555) 987-6543',
    appointmentDate: '2024-01-20',
    appointmentTime: '02:00 PM',
    reason: 'Child vaccination',
    status: 'pending',
    createdAt: '2024-01-12T14:30:00Z',
  },
  {
    id: 'apt3',
    doctorId: '5',
    userId: '2',
    patientName: 'Mike Johnson',
    patientEmail: 'mike.j@example.com',
    patientPhone: '+1 (555) 234-5678',
    appointmentDate: '2024-01-08',
    appointmentTime: '11:00 AM',
    reason: 'Skin consultation',
    status: 'completed',
    createdAt: '2024-01-05T09:15:00Z',
  },
];

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