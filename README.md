# 🩺 MedicoMeet – Frontend

**MedicoMeet** is a modern and responsive Single Page Application (SPA) that allows patients to seamlessly book appointments with doctors based on specialization, location, and availability. Built using **React (Vite)**, **TypeScript**, and **Tailwind CSS**, this frontend project serves as the user interface layer for a full-stack doctor appointment booking system.

---

##  **Key Highlights**
- 🌐 Single Page Application (SPA) built with React and Tailwind CSS

- ⚙️ RESTful API backend with Spring Boot and MySQL

- 👥 Separate user and admin roles

- 📅 Appointment booking with date/time slot selection

- 🧾 Admin can confirm/cancel bookings and manage doctor records

- 🔍 Filter doctors by specialization, rating, and location

- 🧑‍⚕️ Doctor profile includes availability calendar, bio, and patient reviews

- 📱 Fully responsive design (mobile/tablet/desktop)


## 🧑‍⚕️ **Patient Features**


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

---


## 🔥 Live Preview

🌐 [Click here to view the live site]  https://cozy-brioche-13d622.netlify.app/


---


## 📸 UI Screenshots

Include all major screenshots here:

- Home, Doctor Cards, Profile Pages
- Login/Register, Booking Pages
- Admin Panel (Manage Doctors/Appointments/Patients)
- Confirmation pages, modals, etc.


# **Screenshots**
## **Home**

![Screenshot_20-6-2025_19536_localhost](https://github.com/user-attachments/assets/40cd7d6c-a475-4462-94d8-5da80143455e)

## **Doctors**

![Screenshot_20-6-2025_19547_localhost](https://github.com/user-attachments/assets/7e876da3-32aa-49e8-bfb0-5c6a083e861f)

## **About**

![Screenshot_25-6-2025_101724_localhost](https://github.com/user-attachments/assets/a1cdb927-742d-4d8a-a75e-1f9c1c021f3e)

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

---

## 🛠️ Tech Stack

| Category     | Tech Used                            |
|--------------|---------------------------------------|
| Frontend     | React (Vite), TypeScript              |
| Styling      | Tailwind CSS                          |
| Icons        | Lucide React Icons                    |
| Routing      | React Router                          |
| HTTP Client  | Axios                                 |
| Auth         | JWT token-based authentication        |
| State Mgmt   | useState, useContext, useEffect       |
| Deployment   | Netlify                               |

---

## 📁 Folder Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
├── tailwind.config.js
└── vite.config.ts
```


## 🚀 Getting Started

### 📋 Prerequisites

- Node.js v16+
- npm
- Modern code editor (e.g., VS Code)

### 🧩 Setup Steps

```bash
# 1. Clone the repo
git clone https://github.com/RaviRajanolla/medicomeet.git
cd medicomeet-frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

```

Visit [http://localhost:5173](http://localhost:5173) to see the app running.

---

## ⚙️ Configuration

Create `.env` in the root:

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Make sure your backend is CORS-enabled to accept requests from this frontend.

---

## 🔐 Auth & Route Protection

- JWT tokens stored in localStorage
- ProtectedRoute component used to guard admin/user-only pages
- Admin routes only accessible with `admin` role

---

## 🧪 Testing & Deployment

- All routes tested via browser manually
- Deployment is done using [Netlify](https://www.netlify.com/)
- Backend deployed separately (see backend repo)

---

## 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repo
# Create a new branch: git checkout -b feature/xyz
# Commit your changes: git commit -m "Add xyz feature"
# Push to GitHub and create a PR
```


## 📝 License

Licensed under the **MIT License**.

---

## 📫 Contact

**Ravi Rajanolla**  
📧 [Ravikumar63964@gmail.com](mailto:Ravikumar63964@gmail.com)  
🔗 [GitHub – RaviRajanolla](https://github.com/RaviRajanolla)  
🌐 [Portfolio]

---


















