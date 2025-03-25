import express from 'express';
import { getMe, signin, signout, signup } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get("/me", protect, getMe);

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

export default router;