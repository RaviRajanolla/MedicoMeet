# 🩺 MedicoMeet
MedicoMeet is a full-stack doctor appointment booking platform designed to bridge the gap between patients and healthcare providers. It offers a user-friendly interface for patients to browse doctors by specialization, view detailed profiles, and book appointments,while giving admins complete control over doctor listings and appointment management.

Built using React (Vite) for the frontend and Spring Boot (Java) for the backend, the system ensures a smooth, fast, and responsive experience. It includes features like real-time booking, rating/review system, and an admin panel with full CRUD capabilities for managing doctors and appointments.

##  **Key Highlights**
- 🌐 Single Page Application (SPA) built with React and Tailwind CSS

- ⚙️ RESTful API backend with Spring Boot and MySQL

- 👥 Separate user and admin roles

- 📅 Appointment booking with date/time slot selection

- 🧾 Admin can confirm/cancel bookings and manage doctor records

- 🔍 Filter doctors by specialization, rating, and location

- 🧑‍⚕️ Doctor profile includes availability calendar, bio, and patient reviews

- 📱 Fully responsive design (mobile/tablet/desktop)


## 🧑‍⚕️ **Patient Features (Frontend)**


| Feature                           | Description                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| 🏠 **Home Page**                  | Welcoming landing page with app overview, CTA buttons, and animations              |
| 🔍 **Doctor Browsing**            | View all registered doctors in card layout                                         |
| 🧠 **Specialization Filter**      | Filter doctors by specialization (e.g., Cardiology, Neurology, etc.)               |
| 🌐 **Doctor Profile Page**        | View detailed doctor info: photo, specialization, availability, biography, reviews |
| 🗓️ **Appointment Booking**       | Book appointments with selected doctor, date, and time slot                        |
| ✍️ **Self-Registration/Login**    | Patients can sign up and log in securely                                           |
| 💼 **Appointment Management**     | View, cancel, or reschedule appointments (user-side)                               |
| 🌟 **Review System**              | Submit ratings and reviews for doctors after appointment                           |
| 📱 **Responsive UI**              | Works smoothly across mobile, tablet, and desktop devices                          |
| 🎨 **Minimal Swiss-Style Design** | Light blue/white theme, Tailwind CSS, clean layout                                 |
| 💬 **Error Handling**             | Input validations and user-friendly feedback (success, errors)                     |
| 🔁 **Smooth Transitions**         | Animated page loads, modal popups, hover effects                                   |


## 🔐 **Admin Features (Frontend + Backend)**

| Feature                               | Description                                            |
| ------------------------------------- | ------------------------------------------------------ |
| 🔑 **Admin Login**                    | Secure access for admin users only                     |
| 📅 **View Appointments**              | List of all appointments with patient/doctor details   |
| ✅ **Confirm/Cancel Bookings**         | Admin can approve or cancel appointments               |
| 🧑‍⚕️ **Doctor CRUD**                 | Add, edit, or delete doctors from the platform         |
| 📊 **Admin Panel UI**                 | Simple dashboard for appointment and doctor management |
| 👥 **User Management** (future scope) | View all registered users (optional enhancement)       |

## 🔧**Backend Features (Spring Boot + MySQL)**
| Feature                  | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| 📡 **RESTful APIs**      | Secure and scalable APIs using Spring Boot                       |
| 🧾 **Appointment API**   | Book, get, update, or delete appointment endpoints               |
| 🧑‍⚕️ **Doctor API**     | Full CRUD endpoints for managing doctors                         |
| 👤 **User API**          | Register and login endpoints with validation                     |
| 🔐 **Admin API**         | Login endpoint to access restricted features                     |
| 🔌 **MySQL Integration** | Persistent database storage for doctors, users, and appointments |
| 📬 **Postman Tested**    | All endpoints tested via Postman collections                     |
| 💡 **DTO Usage**         | Clean data transfer between layers (future enhancement)          |
| 🌍 **CORS Enabled**      | Frontend-backend communication allowed (e.g., Netlify to Render) |


## 🧩 **Architecture & Tech Stack**

| Layer    | Tech Used                                                           |
| -------- | ------------------------------------------------------------------- |
| Frontend | React.js (Vite), TypeScript, Tailwind CSS, Lucide Icons, Axios      |
| Backend  | Spring Boot, Spring Data JPA, MySQL, REST APIs                      |
| Tools    | Postman, Netlify (frontend deploy), Render (backend deploy), GitHub |


## 🖥️ **Frontend – How to Run Locally**
Follow the steps below to set up and run the frontend of MedicoMeet on your local machine:
## 📁 **Prerequisites**
Make sure you have the following installed:
Node.js (v16 or higher recommended)
npm (comes with Node.js)
A modern code editor like VS Code
# 🚀 **Steps to Start Frontend**
### 1. Navigate to the frontend folder
cd frontend

### 2. Install all dependencies
npm install

### 3. Start the development server
npm run dev
**Steps to Start Frontend**

## After running npm run dev, you will see output like:
VITE v4.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/

Open the browser and go to http://localhost:5173 to view the frontend live.

# ⚙️ **Configuration Notes**
- Axios is used to call REST APIs from the Spring Boot backend.

- Backend base URL can be updated in the API service file (e.g., http://localhost:8080/api/...).

- Ensure CORS is enabled in your Spring Boot application (@CrossOrigin) so the frontend can talk to the backend.

- If you're deploying separately (e.g., Netlify + Render), update the production URLs accordingly.

# 🔧 **Backend – How to Run**
Ensure the following tools are installed and configured:
- ✅ Java JDK (17 or higher)

- ✅ Spring Tool Suite (STS) or IntelliJ IDEA

- ✅ MySQL Server (running on port 3306)

- ✅ Postman (for API testing, optional)

# 🛠️ **Setup Instructions**
1. Clone or Download the Backend Folder  

- From this repository, download the /backend folder separately

- Open the folder in STS or IntelliJ as a Maven project

2. Create a Database in MySQL
   CREATE DATABASE medicomeet;
3. Configure application.properties
   Edit this file inside src/main/resources:  
   spring.datasource.url=jdbc:mysql://localhost:3306/medicomeet  
   spring.datasource.username=YOUR_DB_USERNAME  
   spring.datasource.password=YOUR_DB_PASSWORD  
   spring.jpa.hibernate.ddl-auto=update  
   spring.jpa.show-sql=true  
   server.port=8080  

 4. Run the Project
   -  Right-click the main class (e.g., MedicoMeetApplication.java)

    - Select Run as → Spring Boot App
# 🌐 **Available API Endpoints**

| HTTP     | Endpoint                         | Description                  |
| -------- | -------------------------------- | ---------------------------- |
| `POST`   | `/api/users/register`            | Register a new user          |
| `POST`   | `/api/users/login`               | Login as a user              |
| `POST`   | `/api/admin/login`               | Admin login                  |
| `GET`    | `/api/doctors`                   | Get all doctors              |
| `POST`   | `/api/doctors`                   | Add a new doctor (admin)     |
| `PUT`    | `/api/doctors/{id}`              | Update doctor info           |
| `DELETE` | `/api/doctors/{id}`              | Delete a doctor              |
| `POST`   | `/api/appointments`              | Book an appointment          |
| `GET`    | `/api/appointments`              | Admin: View all appointments |
| `PUT`    | `/api/appointments/{id}/confirm` | Confirm appointment          |
| `PUT`    | `/api/appointments/{id}/cancel`  | Cancel appointment           |


# ⚙️ **Configuration Notes**
- Backend runs on: http://localhost:8080

- Make sure CORS is enabled to allow frontend access (usually with @CrossOrigin)

- Tested with Postman for all CRUD and Auth routes



You can check out the live here:  
👉 [MedicoMeet Frontend Live].

# **Screenshots**
## **Home**





![Screenshot_20-6-2025_19536_localhost](https://github.com/user-attachments/assets/40cd7d6c-a475-4462-94d8-5da80143455e)



## **Doctors**



![Screenshot_20-6-2025_19547_localhost](https://github.com/user-attachments/assets/7e876da3-32aa-49e8-bfb0-5c6a083e861f)

## **About**


![Screenshot_20-6-2025_19550_localhost](https://github.com/user-attachments/assets/d4c702ae-b3c1-496d-84d8-b442d796b1ff)


## **Contact**




![Screenshot_20-6-2025_204543_localhost](https://github.com/user-attachments/assets/cbd29e00-1b6e-4d3a-af8d-0f3af9bc1491)






## **Register**



![Screenshot_20-6-2025_195646_localhost](https://github.com/user-attachments/assets/15eb0d7f-8565-4660-82a6-d6e07a951aff)

## **Login** 




![Screenshot_20-6-2025_195729_localhost](https://github.com/user-attachments/assets/f1511f52-f1fa-40bb-8f34-4f05440a7821)


## **Admin Login**


![Screenshot_20-6-2025_195924_localhost](https://github.com/user-attachments/assets/1ae3b93a-4e65-4d74-a6c1-b131ada56b49)



##  **Admin Manage Doctor**



![Screenshot_20-6-2025_195955_localhost](https://github.com/user-attachments/assets/f0b8b6a2-f2f8-4dca-850f-559ef297ec6f)



## **Manage Appointments**


![Screenshot_20-6-2025_20023_localhost](https://github.com/user-attachments/assets/b5bea210-c7b1-4b68-9efb-6275eaf16e58)


## **Manage Patients**



![Screenshot_20-6-2025_20110_localhost](https://github.com/user-attachments/assets/389895e3-a8c7-4915-8462-32022777a14e)


## **System Settings**


![Screenshot_20-6-2025_20134_localhost](https://github.com/user-attachments/assets/dad90052-7120-4870-a9ce-a877e457f5e4)

## **Book an Appointment**



![Screenshot_20-6-2025_201058_localhost](https://github.com/user-attachments/assets/cd5658ea-e609-4891-89d7-399fae09f4b1)


## **Appointment Booked**



![Screenshot (156)](https://github.com/user-attachments/assets/5bf361c7-f8a4-4a17-a9d5-0557f472a1ce)

# 🌐 **Live Demo**
## 🌐 Live Preview





















