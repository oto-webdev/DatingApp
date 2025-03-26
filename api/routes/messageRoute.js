import express from 'express';
import { getConversation, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.get("/conversation/:userId", getConversation);

router.post("/send", sendMessage);

export default router;