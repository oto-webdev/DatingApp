import express from 'express';
import { protect } from '../middleware/auth.js';
import { updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.put("/update", protect, updateProfile);

export default router;