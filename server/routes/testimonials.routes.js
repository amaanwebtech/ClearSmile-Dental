import express from 'express';
import { getTestimonials, createTestimonial, deleteTestimonial } from '../controllers/testimonialsController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protectAdmin, createTestimonial);
router.delete('/:id', protectAdmin, deleteTestimonial);

export default router;
