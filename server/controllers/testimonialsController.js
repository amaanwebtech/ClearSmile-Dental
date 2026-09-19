import pool from '../config/db.js';

export const getTestimonials = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM testimonials WHERE is_approved = TRUE ORDER BY created_at DESC');
    res.json({ success: true, count: rows.length, testimonials: rows });
  } catch (error) {
    next(error);
  }
};

// ---- Admin-only ----

export const createTestimonial = async (req, res, next) => {
  try {
    const { patient_name, rating, message, image_url } = req.body;
    if (!patient_name || !message) {
      return res.status(400).json({ success: false, message: 'Patient name and message are required' });
    }
    const [result] = await pool.query(
      'INSERT INTO testimonials (patient_name, rating, message, image_url) VALUES (?, ?, ?, ?)',
      [patient_name, rating || 5, message, image_url || null]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};
