import pool from '../config/db.js';

export const getDoctors = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM doctors WHERE is_active = TRUE ORDER BY id ASC');
    res.json({ success: true, count: rows.length, doctors: rows });
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM doctors WHERE id = ? LIMIT 1', [req.params.id]);
    if (!rows[0]) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, doctor: rows[0] });
  } catch (error) {
    next(error);
  }
};

// ---- Admin-only ----

export const createDoctor = async (req, res, next) => {
  try {
    const { name, specialization, qualification, bio, image_url, experience_years } = req.body;
    if (!name || !specialization) {
      return res.status(400).json({ success: false, message: 'Name and specialization are required' });
    }
    const [result] = await pool.query(
      'INSERT INTO doctors (name, specialization, qualification, bio, image_url, experience_years) VALUES (?, ?, ?, ?, ?, ?)',
      [name, specialization, qualification || null, bio || null, image_url || null, experience_years || 0]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const { name, specialization, qualification, bio, image_url, experience_years, is_active } = req.body;
    const [result] = await pool.query(
      `UPDATE doctors SET name = COALESCE(?, name), specialization = COALESCE(?, specialization),
       qualification = COALESCE(?, qualification), bio = COALESCE(?, bio), image_url = COALESCE(?, image_url),
       experience_years = COALESCE(?, experience_years), is_active = COALESCE(?, is_active) WHERE id = ?`,
      [name, specialization, qualification, bio, image_url, experience_years, is_active, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, message: 'Doctor updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM doctors WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    next(error);
  }
};
