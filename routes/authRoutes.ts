import { Router } from "express";
import { login } from "../controllers/authController";

const router = Router();

router.get('/login', login);

export default router;