import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About MedicoMeet</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connecting patients with the best healthcare professionals to provide accessible, quality healthcare for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://img.freepik.com/free-photo/healthcare-worker-holding-placard-with-supportive-we-can-this-message-while-standing-hospital_637285-4853.jpg?semt=ais_hybrid&w=740" 
                alt="Doctor with patient" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            
              <p className="text-gray-600 mb-6">
                At MedicoMeet, our mission is to revolutionize healthcare accessibility by providing a seamless platform that connects patients with healthcare providers. We strive to make quality healthcare services available to everyone, regardless of location or circumstances.
              </p>
              <p className="text-gray-600 ">
                We believe that everyone deserves access to quality healthcare, and our platform is designed to break down barriers, reduce wait times, and improve the overall healthcare experience for both patients and doctors.
              </p>
              
           </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://media.istockphoto.com/id/455237505/photo/doctor-holding-heart.jpg?s=612x612&w=0&k=20&c=Cnb5Loe7gAB49NX6lerlWgQZQYJYO2DZz_xrtX5czck=" 
                alt="Doctor with patient" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                MedicoMeet was founded in 2024 by a team of healthcare professionals and technology experts who recognized the challenges patients face when trying to access quality healthcare services.
              </p>
              <p className="text-gray-600 mb-6">
                Our founders experienced firsthand the frustrations of long wait times, difficulty finding specialists, and the lack of transparency in healthcare services. They set out to create a solution that would address these issues and make healthcare more accessible to everyone.
              </p>
              <p className="text-gray-600">
                Today, MedicoMeet has grown into a trusted platform that connects thousands of patients with qualified healthcare providers, simplifying the process of finding and booking medical appointments.
              </p>
            </div>
          </div>
        </div>
      </section>

             

            <div className="w-full flex justify-center mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition">
                    { <Link to="/doctors" className="btn-primary inline-flex items-center">
                      Find a Doctor <ArrowRight size={16} className="ml-2" />
                     </Link> } 
          </button>
          </div>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at MedicoMeet, from how we develop our platform to how we interact with patients and healthcare providers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Patient-Centered Care</h3>
              <p className="text-gray-600">
                We put patients at the center of everything we do, ensuring that our platform meets their needs and provides a seamless healthcare experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Transparency</h3>
              <p className="text-gray-600">
                We believe in being open and honest about our services, pricing, and the qualifications of healthcare providers on our platform.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Quality</h3>
              <p className="text-gray-600">
                We are committed to connecting patients with qualified healthcare professionals who provide high-quality care and meet our strict standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Innovation</h3>
              <p className="text-gray-600">
                We continuously strive to improve our platform and services by embracing technology and innovative solutions to healthcare challenges.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Inclusivity</h3>
              <p className="text-gray-600">
                We are dedicated to making healthcare accessible to everyone, regardless of their background, location, or circumstances.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Privacy & Security</h3>
              <p className="text-gray-600">
                We prioritize the protection of patient information and adhere to the highest standards of data security and privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals behind MedicoMeet who are passionate about transforming healthcare accessibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/professional.jpg"
                  alt="Dr. Ravi kumar"
                  className="w-full h-full object-cover object-center scale-110"
                   style={{ objectPosition: 'center 25%' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Dr. Ravi kumar</h3>
                <p className="text-blue-600 mb-3">Founder & CEO</p>
                <p className="text-gray-600">
                  A visionary technology leader with extensive experience in healthcare innovation. Dr. Rajanolla founded MedicoMeet to bridge the gap between patients and healthcare providers through cutting-edge technology solutions.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://img.freepik.com/premium-photo/confident-female-doctor-white-coat-with-stethoscope-smiling-standing-with-her-arms-crossed-against-plain-background_1285909-897.jpg?ga=GA1.1.740885608.1748072649&w=740" 
                  alt="Dr. Abhignya Arah" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Dr. Abhignya Arah</h3>
                <p className="text-blue-600 mb-3">Chief Medical Officer</p>
                <p className="text-gray-600">
                  A renowned medical professional with over 15 years of experience in healthcare. Dr. Arah ensures that our platform maintains the highest standards of medical quality and ethics.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://img.freepik.com/premium-photo/doctor-man-keeping-arms-crossed_1368-40089.jpg?ga=GA1.1.740885608.1748072649&w=740" 
                  alt="Michael Chen" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Dr. Karna</h3>
                <p className="text-blue-600 mb-3">CTO</p>
                <p className="text-gray-600">
                  With a background in software engineering and healthcare technology, Michael leads our technical team to develop innovative solutions for healthcare delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Transforming Healthcare</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Whether you're a patient seeking quality care or a healthcare provider looking to expand your practice, MedicoMeet offers a platform that connects you to the right people.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="btn-primary bg-white text-blue-600 hover:bg-blue-50">
              Create an Account
            </Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-blue-700">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;