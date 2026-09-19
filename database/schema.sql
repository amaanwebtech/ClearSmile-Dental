-- ClearSmile Dental — MySQL schema (import via phpMyAdmin or `mysql -u root < schema.sql`)

CREATE DATABASE IF NOT EXISTS clearsmile_dental CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE clearsmile_dental;

-- ------------------------------------------------------------
-- Admins (dashboard login)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Doctors
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  specialization VARCHAR(150) NOT NULL,
  qualification VARCHAR(150),
  bio TEXT,
  image_url VARCHAR(500),
  experience_years INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Services
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  short_description VARCHAR(300),
  description TEXT,
  icon VARCHAR(80) DEFAULT 'tooth',
  price DECIMAL(10,2) DEFAULT 0,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Appointments
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  service_id INT,
  doctor_id INT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  message TEXT,
  status ENUM('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- Testimonials
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(120) NOT NULL,
  rating TINYINT DEFAULT 5,
  message TEXT NOT NULL,
  image_url VARCHAR(500),
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Contact messages
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  subject VARCHAR(200),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Seed data
-- ------------------------------------------------------------

-- Default admin: email amaan.web.developer.8791@gmail.com / password Admin@123
-- (password hash generated with bcrypt, cost 10)
INSERT INTO admins (name, email, password) VALUES
('Admin', 'amaan.web.developer.8791@gmail.com', '$2a$10$bIBjJINkUKP0I1EV9UUnm.nKtrxeHd1Y2hWSA9CkMxOsUg/8UtarC')
ON DUPLICATE KEY UPDATE email = email;

INSERT INTO doctors (name, specialization, qualification, bio, image_url, experience_years) VALUES
('Dr. Ayesha Khan', 'Cosmetic & Restorative Dentistry', 'BDS, MDS', 'Dr. Ayesha has over a decade of experience creating confident, natural-looking smiles using the latest cosmetic dentistry techniques.', '/images/doctors/doctor-1.jpg', 12),
('Dr. Imran Siddiqui', 'Orthodontics', 'BDS, MOrth RCS', 'A specialist in braces and clear aligners, Dr. Imran has helped thousands of patients achieve perfectly aligned smiles.', '/images/doctors/doctor-2.jpg', 9),
('Dr. Sara Malik', 'Pediatric Dentistry', 'BDS, DCH', 'Dr. Sara makes dental visits fun and stress-free for children with a gentle, patient-first approach.', '/images/doctors/doctor-3.jpg', 7),
('Dr. Farhan Ali', 'Oral & Maxillofacial Surgery', 'BDS, FCPS (OMFS)', 'Dr. Farhan specializes in wisdom tooth extraction, dental implants, and complex oral surgeries.', '/images/doctors/doctor-4.jpg', 15)
ON DUPLICATE KEY UPDATE name = name;

INSERT INTO services (title, slug, short_description, description, icon, price, image_url) VALUES
('Teeth Whitening', 'teeth-whitening', 'Brighten your smile by several shades in just one visit.', 'Our professional in-office and take-home whitening treatments use safe, dentist-grade formulas to lift years of staining and give you a noticeably brighter, whiter smile with lasting results.', 'sparkles', 8000.00, '/images/services/whitening.jpg'),
('Dental Implants', 'dental-implants', 'Permanent, natural-looking replacements for missing teeth.', 'Titanium implants fused with your jawbone provide a strong, long-term foundation for crowns, bridges, or dentures — restoring both function and appearance.', 'implant', 45000.00, '/images/services/implants.jpg'),
('Braces & Clear Aligners', 'braces-aligners', 'Straighten teeth with traditional braces or invisible aligners.', 'From metal braces to clear, removable aligners, we design a custom orthodontic plan to align your teeth and bite comfortably and discreetly.', 'braces', 60000.00, '/images/services/braces.jpg'),
('Root Canal Treatment', 'root-canal-treatment', 'Pain-free treatment to save infected or damaged teeth.', 'Using modern rotary endodontic techniques, our root canal treatments are virtually painless and help preserve your natural tooth instead of extraction.', 'tooth', 12000.00, '/images/services/root-canal.jpg'),
('Dental Cleaning', 'dental-cleaning', 'Routine scaling and polishing for healthy gums.', 'Regular professional cleanings remove plaque and tartar buildup, preventing cavities and gum disease while keeping your smile fresh.', 'clean', 3000.00, '/images/services/cleaning.jpg'),
('Pediatric Dentistry', 'pediatric-dentistry', 'Gentle, friendly dental care designed for kids.', 'A comfortable, kid-friendly environment and gentle techniques make dental visits a positive experience for your children from their very first tooth.', 'child', 2500.00, '/images/services/pediatric.jpg')
ON DUPLICATE KEY UPDATE title = title;

INSERT INTO testimonials (patient_name, rating, message, image_url) VALUES
('Bilal Ahmed', 5, 'ClearSmile Dental completely changed how I feel about visiting the dentist. The staff is friendly and Dr. Ayesha did an amazing job with my whitening treatment!', '/images/testimonials/patient-1.jpg'),
('Hina Raza', 5, 'I was terrified of getting braces, but the team made the entire process so easy to understand and comfortable. Highly recommend!', '/images/testimonials/patient-2.jpg'),
('Usman Tariq', 4, 'Professional, clean, and modern clinic. My root canal was completely painless. Thank you, ClearSmile team!', '/images/testimonials/patient-3.jpg'),
('Zoya Sheikh', 5, 'My kids actually look forward to their dental checkups now. Dr. Sara is wonderful with children.', '/images/testimonials/patient-4.jpg')
ON DUPLICATE KEY UPDATE patient_name = patient_name;
