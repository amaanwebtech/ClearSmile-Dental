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

**Default admin login:** `amaan.web.developer.8791@gmail.com` / `Admin@123` — change this after first login.

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

Doctor, service, and testimonial photos default to elegant initial-based avatars when no image is set. The project ships with free stock photos already in place under `client/public/images/`. To swap in your own real clinic photos, replace the files in `client/public/images/{doctors,services,testimonials,gallery}/` (keep the same filenames) or set a new `image_url` (e.g. `/images/doctors/dr-smith.jpg`) via the admin panel.

## Home Page Scroll Video

The homepage hero (`client/src/components/home/ScrollVideoHero.jsx`) uses an Apple-style scroll-scrubbed video: as the user scrolls, the video's playback position is tied directly to scroll progress instead of playing automatically. To swap the clip, replace `client/public/videos/hero-smile.mp4` with your own short (5–20s) landscape video.

## Media Credits

Stock photos and video used as placeholders are free-to-use assets from [Pexels](https://www.pexels.com) and [Mixkit](https://mixkit.co), both licensed for commercial use with no attribution required. Replace them with your own clinic's photos/video whenever you're ready.
