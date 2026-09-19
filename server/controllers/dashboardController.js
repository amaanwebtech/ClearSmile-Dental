import pool from '../config/db.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [[{ totalAppointments }]] = await pool.query('SELECT COUNT(*) AS totalAppointments FROM appointments');
    const [[{ pendingAppointments }]] = await pool.query(
      "SELECT COUNT(*) AS pendingAppointments FROM appointments WHERE status = 'pending'"
    );
    const [[{ totalDoctors }]] = await pool.query('SELECT COUNT(*) AS totalDoctors FROM doctors WHERE is_active = TRUE');
    const [[{ totalServices }]] = await pool.query('SELECT COUNT(*) AS totalServices FROM services WHERE is_active = TRUE');
    const [[{ unreadMessages }]] = await pool.query('SELECT COUNT(*) AS unreadMessages FROM contact_messages WHERE is_read = FALSE');
    const [recentAppointments] = await pool.query(
      `SELECT a.*, s.title AS service_title FROM appointments a
       LEFT JOIN services s ON a.service_id = s.id
       ORDER BY a.created_at DESC LIMIT 5`
    );

    res.json({
      success: true,
      stats: { totalAppointments, pendingAppointments, totalDoctors, totalServices, unreadMessages },
      recentAppointments,
    });
  } catch (error) {
    next(error);
  }
};
