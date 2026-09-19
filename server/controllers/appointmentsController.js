import pool from '../config/db.js';

export const createAppointment = async (req, res, next) => {
  try {
    const { patient_name, email, phone, service_id, doctor_id, appointment_date, appointment_time, message } = req.body;

    if (!patient_name || !email || !phone || !appointment_date || !appointment_time) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }

    const [result] = await pool.query(
      `INSERT INTO appointments (patient_name, email, phone, service_id, doctor_id, appointment_date, appointment_time, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [patient_name, email, phone, service_id || null, doctor_id || null, appointment_date, appointment_time, message || null]
    );

    res.status(201).json({
      success: true,
      message: 'Appointment request submitted! We will contact you shortly to confirm.',
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

// ---- Admin-only ----

export const getAppointments = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, s.title AS service_title, d.name AS doctor_name
       FROM appointments a
       LEFT JOIN services s ON a.service_id = s.id
       LEFT JOIN doctors d ON a.doctor_id = d.id
       ORDER BY a.created_at DESC`
    );
    res.json({ success: true, count: rows.length, appointments: rows });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }
    const [result] = await pool.query('UPDATE appointments SET status = ? WHERE id = ?', [status, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Appointment status updated' });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM appointments WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    next(error);
  }
};
