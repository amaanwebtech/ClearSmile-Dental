import express from 'express';
import {
  createContactMessage,
  getContactMessages,
  markMessageRead,
  deleteContactMessage,
} from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createContactMessage);
router.get('/', protectAdmin, getContactMessages);
router.put('/:id/read', protectAdmin, markMessageRead);
router.delete('/:id', protectAdmin, deleteContactMessage);

export default router;
