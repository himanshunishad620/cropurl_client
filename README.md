# CropURL 🔗

> A full-stack URL shortener and QR analytics platform built with React, Node.js, Express, and MongoDB.

CropURL allows users to create short URLs, generate QR codes, and track clicks, scans, unique visitors, locations, browsers, operating systems, and daily engagement through an analytics dashboard.

## 🚀 Live Demo

**Live:** Add your deployed CropURL URL here

**Frontend Repository:** Add repository URL

**Backend Repository:** Add repository URL

---

## ✨ Features

- 🔗 Create and manage shortened URLs
- 📱 Generate QR codes for short links
- 📊 Track clicks and QR scans
- 👥 Track unique visitors/clicks
- 📈 View 7, 30, and 90-day analytics
- 🌍 Track visitor locations by city
- 🌐 Browser and operating-system analytics
- 🔍 Search, filter, and sort URLs
- 📥 Import URLs using CSV
- 📤 Export URL data to CSV
- 🔐 JWT-based authentication
- ✉️ Email verification and password reset
- 📱 Responsive dashboard
- 🔔 Loading, validation, empty, and error states

---

## 🛠️ Tech Stack

### Frontend

**React 19 · Vite · Tailwind CSS · Redux Toolkit · RTK Query · React Router · Axios · Recharts · Formik · Yup · PapaParse**

### Backend

**Node.js · Express.js · MongoDB · Mongoose · JWT · bcrypt · Nodemailer · UAParser**

### Services & Deployment

**MongoDB Atlas · Cloudinary · Vercel · Netlify · Render**

---

## 📸 Screenshots

### Dashboard

![CropURL Dashboard](./screenshots/dashboard.png)

### URL Management

![CropURL URLs](./screenshots/urls.png)

### Analytics

![CropURL Analytics](./screenshots/analytics.png)

> Add your screenshots to a `screenshots` folder in the repository.

---

## 🧩 Key Technical Highlights

- Built a responsive SPA using **React and Tailwind CSS**
- Used **Redux Toolkit and RTK Query** for state and server-state management
- Designed REST APIs using **Node.js and Express.js**
- Designed URL and analytics schemas using **MongoDB and Mongoose**
- Implemented **JWT authentication** and protected routes
- Implemented email verification and password-reset workflows
- Built click and QR scan tracking with daily analytics
- Added city, browser, and OS-based analytics
- Built interactive analytics charts using **Recharts**
- Implemented CSV validation, bulk import, and export
- Configured production deployment with environment-based configuration

---

## 🔄 How It Works

```text
Long URL
   ↓
Generate Short Code
   ↓
Short URL / QR Code
   ↓
User Opens or Scans
   ↓
Track Analytics
   ↓
Redirect to Destination
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 20+
- npm
- MongoDB / MongoDB Atlas

### Clone the Repository

```bash
git clone https://github.com/your-username/cropurl.git
cd cropurl
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `backend/.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Add the required Cloudinary and email configuration as needed.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create a `frontend/.env` file:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🔐 Security

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- HTTP-only and secure cookies where applicable
- CORS configuration
- Environment variables for secrets
- Input and URL validation
- Expiring verification and password-reset tokens

**Never commit `.env` files or secrets to GitHub.**

---

## 👨‍💻 Author

**Himanshu Nishad**

BCA Graduate · Frontend / Full-Stack Developer

Focused on building modern web applications using **React, JavaScript, Node.js, and MongoDB**.

---

⭐ If you found CropURL interesting, consider starring the repository.
