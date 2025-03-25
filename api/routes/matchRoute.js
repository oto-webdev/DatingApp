import express from 'express';
import { protect } from '../middleware/auth.js';
import { getMatches, getUserProfiles, swipeLeft, swipeRight } from '../controllers/matchController.js';

const router = express.Router();

router.get("/", protect, getMatches);
router.get("/user-profiles", protect, getUserProfiles);

router.post("/swipe-right/:likedUserId", protect, swipeRight);
router.post("/swipe-left/:dislikedUserId", protect, swipeLeft);

export default router;