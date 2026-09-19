import express from 'express';
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorsController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.post('/', protectAdmin, createDoctor);
router.put('/:id', protectAdmin, updateDoctor);
router.delete('/:id', protectAdmin, deleteDoctor);

export default router;
