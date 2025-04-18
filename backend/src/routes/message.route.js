import express from 'express';
import { getUser } from '../controllers/message.controller.js';

const router = express.Router();
router.get("/users",getUser)
export default router;