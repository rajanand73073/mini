# LinkedIn Mini – MERN Social Network

A concise, full-stack LinkedIn-like social platform built with MongoDB, Express, React, and Node.js.

---

## 🚀 Features

- **User Auth:** Register, login, logout (JWT, cookies)
- **Profile:** View/edit profile, see own and others' posts
- **Posts:** Create, view, and real-time updates via Socket.io
- **Feed:** All posts sorted by timeline, author name shown
- **Protected Routes:** Only authenticated users access main features

---

## 🏗️ Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS, Axios, Framer Motion
- **Backend:** Express 5, MongoDB 8, Mongoose, Joi, Socket.io
- **Other:** JWT, bcryptjs, cookie-parser

---

## 📦 Folder Structure

```
linkdin-mini/
├── linkdin-mini-backend/
│   ├── src/
│   └── .env
├── linkdin-mini-frontend/
│   ├── linkdin-mini/
│   │   ├── src/
│   │   └── .env
```

---

## ⚡ Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/linkdin-mini.git
cd linkdin-mini/linkdin-mini-backend
npm install
cd ../linkdin-mini-frontend/linkdin-mini
npm install
```

### 2. Environment Setup

**Backend `.env`:**
```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=9000
```

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:9000
```

### 3. Run Locally

**Backend:**
```bash
npm run dev
```
**Frontend:**
```bash
npm run dev
```
Visit: [http://localhost:5173](http://localhost:5173)

---

## 📝 Usage

- **Sign Up / Sign In**
- **Create Post**
- **View Feed**
- **View/Edit Profile**
- **Logout**

---

## 🌐 Live Demo

[Live Link](https://your-live-link-here.com)

---

## 🛠️ Deployment

- Backend: Heroku/Render/AWS
- Frontend: Vercel/Netlify

---

## 👤 Author

- Anand Raj
- [GitHub](https://github.com/yourusername)

---

## 📄 License
