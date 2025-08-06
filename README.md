# BlogHub – A Simple Blogging Platform

## 🚀 Overview
BlogHub is a basic blogging application built with the MERN stack that allows users to register, log in, create, edit, delete, and view blog posts.  

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **UI Library:** React Icons

---

## ✨ Features
- **User Authentication:** Register, Login, Logout (JWT-based)
- **Blog Management:**
  - Create, Edit, Update, Delete Blogs
  - View all blogs
  - View a single blog
  - Delete confirmation (type "delete")
- **My Blogs:** Manage only your authored blogs
- **User Profile:** View name, email, and authored blogs
- Sidebar with dynamic active state for better navigation

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash

git clone <repo-url>
cd BlogHub

```
### 2️⃣ Setup Server
```bash

cd server
npm install

Create a .env file with:

PORT=4000
MONGO_URI=your-mongo-uri
NODE_ENV=development
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=6h
CLIENT_BASE_URL=http://localhost:5174

npm start

```
### 3️⃣ Setup Client
```bash

cd client
npm install

Create a .env file with:

VITE_BASE_URL=http://localhost:4000

npm start

```
## 📡 API Endpoints

### Auth

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register user     |
| POST   | `/api/auth/login`    | Login and get JWT |
| POST   | `/api/auth/logout`   | Logout user       |

### Blogs

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/api/blogs`     | Get all blogs               |
| GET    | `/api/blogs/:id` | Get blog by ID              |
| POST   | `/api/blogs`     | Create blog (auth required) |
| PUT    | `/api/blogs/:id` | Update blog (author only)   |
| DELETE | `/api/blogs/:id` | Delete blog (author only)   |

### User

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| GET    | `/api/users/me`    | Get current user profile   |
| GET    | `/api/users/blogs` | Get blogs authored by user |


## 🌍 Hosted Links
```bash

Backend: https://bloghubbackend-wt7v.onrender.com

Frontend: [Live Link](https://bloghubfrontend.onrender.com)

```
## 📸 Screenshots

<p align="center">
  <img src="/screenshots/Screenshot from 2025-08-06 04-19-05.png" width="30%" />
  <img src="/screenshots/Screenshot from 2025-08-06 04-19-30.png" width="30%" />
  <img src="/screenshots/Screenshot from 2025-08-06 04-19-38.png" width="30%" />
</p>

<p align="center">
  <img src="/screenshots/Screenshot from 2025-08-06 04-19-55.png" width="30%" />
  <img src="/screenshots/Screenshot from 2025-08-06 04-20-23.png" width="30%" />
  <img src="/screenshots/Screenshot from 2025-08-06 04-20-34.png" width="30%" />
</p>




## 👤 Author

```bash

Muhammed Muslih

```
