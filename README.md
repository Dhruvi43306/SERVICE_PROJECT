# 🚀 Service Request Management System

A modern full-stack web application designed to streamline service request handling between customers, technicians, and administrators. The system provides an efficient workflow for creating, assigning, tracking, and resolving service requests in real time.

---

## 📋 Project Overview

The Service Request Management System helps organizations manage customer service requests efficiently by providing:

* Customer request submission
* Technician assignment and management
* Request status tracking
* Priority-based service handling
* Dashboard analytics and reporting
* Secure user authentication and authorization

The platform improves communication between customers, technicians, and administrators while reducing manual work and increasing operational efficiency.

---

## ✨ Key Features

### 👤 User Management

* User Registration and Login
* Role-Based Access Control
* Profile Management
* Secure Authentication

### 📝 Service Request Management

* Create New Service Requests
* Edit and Update Requests
* Request Categorization
* Priority Management
* Status Tracking

### 🔧 Technician Management

* Assign Requests to Technicians
* View Assigned Tasks
* Update Task Progress
* Track Resolution History

### 📊 Dashboard & Analytics

* Real-Time Statistics
* Service Request Reports
* Performance Metrics
* Request Status Visualization

### 🔔 Notifications

* Status Update Notifications
* Assignment Alerts
* Resolution Updates

---

## 🏗️ System Architecture

### Customer

* Submit service requests
* Track request status
* View request history

### Technician

* View assigned requests
* Update task progress
* Mark requests as completed

### Administrator

* Manage users
* Assign technicians
* Monitor system performance
* Generate reports

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Authentication

* JWT (JSON Web Token)
* Role-Based Authorization

### Tools

* Git & GitHub
* Postman
* VS Code

---

## 📂 Project Structure

```text
Service-Request-Management-System/
│
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── Backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── config/
│
└── Database/
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/service-request-management-system.git
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd Backend
npm install
npm start
```

### Database Setup

1. Install PostgreSQL
2. Create Database

```sql
CREATE DATABASE service_request_db;
```

3. Configure environment variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=service_request_db

JWT_SECRET=your_secret_key
```

---

## 🔄 Workflow

1. User submits a service request.
2. Admin reviews the request.
3. Technician is assigned.
4. Technician updates progress.
5. Request is resolved and closed.
6. User can review request history.

---

## 📸 Screenshots

Add screenshots of:

* Login Page
* Dashboard
* Service Request Form
* Technician Panel
* Admin Dashboard
* Reports Page

---

## 🔒 Security Features

* JWT Authentication
* Password Encryption
* Protected Routes
* Role-Based Access Control
* Input Validation

---

## 🎯 Future Enhancements

* Email Notifications
* SMS Alerts
* Mobile Application
* AI-Based Technician Assignment
* Advanced Analytics Dashboard
* Multi-Organization Support

---

## 👨‍💻 Developer
## Dhruvi Savaliya

Full Stack Developer

Passionate about building scalable, modern, and user-friendly web applications.

## ⭐ If you like this project, don't forget to Star the Repository ⭐

Made with ❤️ using React, Node.js, Express!
