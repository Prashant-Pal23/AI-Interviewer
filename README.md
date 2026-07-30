# 🤖 AI Interview Platform

An AI-powered interview preparation platform built using the MERN stack. The platform helps users upload their resumes, analyze them using ATS, generate AI-powered mock interviews, answer interview questions, and receive detailed AI feedback and performance reports.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Encryption using bcrypt

### 📄 Resume Management
- Upload Resume (PDF)
- Resume stored on Cloudinary
- Extract text from PDF
- Save resume details in MongoDB

### 🎯 ATS Resume Analysis
- AI-powered ATS Score
- Resume strengths
- Weaknesses
- Missing Skills
- Improvement Suggestions

### 🎤 AI Mock Interview
- Generate interview questions using AI
- Technical & HR interview support
- Difficulty Levels
  - Easy
  - Medium
  - Hard
- Submit answers
- AI evaluates complete interview
- Overall Interview Score
- Detailed Feedback
- Improvement Suggestions

### 📊 Dashboard
- Resume Status
- Latest ATS Score
- Completed Interviews
- Average Interview Score
- Recent Interviews
- Quick Actions

### 👤 Profile Management
- Update Profile
- Change Password
- Upload Profile Picture

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Zustand
- Axios
- Tailwind CSS
- DaisyUI
- Vite

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Cloudinary

## AI

- Google Gemini API

---

# 📂 Project Structure

```
AI-Interview/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── layouts/
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── config/
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Prashant-Pal23/AI-Interviewer.git
```

```bash
cd AI-Interviewer
```

---

## Backend Setup

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

---

# 🔗 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Users

```
GET  /api/users/profile
PUT  /api/users/profile/update
PUT  /api/users/change/password
PUT  /api/users/profile/picture
```

## Resume

```
POST /api/resume/upload
POST /api/resume/analyze
GET  /api/resume
```

## Interview

```
POST /api/interview/start
POST /api/interview/answer
POST /api/interview/complete
GET  /api/interview/history
GET  /api/interview/:id
```

## Dashboard

```
GET /api/dashboard
```

---

# 🧠 AI Workflow

### Resume Analysis

```
Upload Resume
        ↓
Extract PDF Text
        ↓
Gemini AI
        ↓
ATS Score
Strengths
Weaknesses
Missing Skills
Suggestions
        ↓
Store in MongoDB
```

---

### Interview Flow

```
Generate Questions
        ↓
User Answers Questions
        ↓
Store Answers
        ↓
Complete Interview
        ↓
Gemini AI Evaluation
        ↓
Overall Score
Feedback
Suggestions
        ↓
Save Report
```

---

# 👨‍💻 Author

**Prashant Pal**

- GitHub: https://github.com/Prashant-Pal23
- LinkedIn: https://www.linkedin.com/in/prashant-pal-aaa49927b/