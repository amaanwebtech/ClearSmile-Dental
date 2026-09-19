import pool from '../config/db.js';

export const getServices = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services WHERE is_active = TRUE ORDER BY id ASC');
    res.json({ success: true, count: rows.length, services: rows });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services WHERE slug = ? LIMIT 1', [req.params.slug]);
    if (!rows[0]) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, service: rows[0] });
  } catch (error) {
    next(error);
  }
};

// ---- Admin-only ----

export const createService = async (req, res, next) => {
  try {
    const { title, slug, short_description, description, icon, price, image_url } = req.body;
    if (!title || !slug) {
      return res.status(400).json({ success: false, message: 'Title and slug are required' });
    }
    const [result] = await pool.query(
      'INSERT INTO services (title, slug, short_description, description, icon, price, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, slug, short_description || null, description || null, icon || 'tooth', price || 0, image_url || null]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { title, short_description, description, icon, price, image_url, is_active } = req.body;
    const [result] = await pool.query(
      `UPDATE services SET title = COALESCE(?, title), short_description = COALESCE(?, short_description),
       description = COALESCE(?, description), icon = COALESCE(?, icon), price = COALESCE(?, price),
       image_url = COALESCE(?, image_url), is_active = COALESCE(?, is_active) WHERE id = ?`,
      [title, short_description, description, icon, price, image_url, is_active, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM services WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};
