# ClearSmile Dental 🦷

A full-stack, premium dental clinic website with online appointment booking, a public-facing site, and an admin dashboard to manage everything.

**Stack:** React (Vite) + Tailwind CSS · Node.js + Express · MySQL

## Features

- Modern, responsive marketing site — Home, About, Services, Service Detail, Doctors, Gallery, Contact
- Online appointment booking (saved to MySQL, no external dependency)
- Contact form with admin inbox
- Patient testimonials
- JWT-secured admin dashboard:
  - Stats overview (appointments, doctors, services, unread messages)
  - Manage appointments (update status, delete)
  - Manage doctors, services, testimonials (create/edit/delete)
  - View & manage contact messages

## Project Structure

```
ClearSmile Dental/
├── client/          React + Vite + Tailwind frontend
├── server/          Node.js + Express REST API
└── database/
    └── schema.sql   MySQL schema + seed data
```

## Prerequisites

- Node.js 18+
- XAMPP (or any MySQL 8 server) running on port 3306

## Setup

### 1. Database

Start MySQL (e.g. via XAMPP Control Panel), then import the schema:

```bash
"C:\xampp\mysql\bin\mysql.exe" -u root < database/schema.sql
```

This creates the `clearsmile_dental` database with tables and seed data (services, doctors, testimonials, and a default admin account).

**Default admin login:** `admin@clearsmile.com` / `Admin@123` — change this after first login.

### 2. Backend

```bash
cd server
npm install
cp .env.example .env   # edit if your MySQL credentials differ
npm run dev
```

API runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Site runs on `http://localhost:5173`.

## Admin Panel

Visit `http://localhost:5173/admin/login` (also linked in the site footer) to manage appointments, doctors, services, testimonials, and contact messages.

## Adding Real Images

Doctor, service, and testimonial photos default to elegant initial-based avatars when no image is set. To use real photos, drop files into `client/public/images/{doctors,services,testimonials}/` and set the matching `image_url` (e.g. `/images/doctors/dr-smith.jpg`) via the admin panel.
