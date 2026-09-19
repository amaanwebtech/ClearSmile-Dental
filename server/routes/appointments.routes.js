import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentsController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/', protectAdmin, getAppointments);
router.put('/:id/status', protectAdmin, updateAppointmentStatus);
router.delete('/:id', protectAdmin, deleteAppointment);

export default router;
