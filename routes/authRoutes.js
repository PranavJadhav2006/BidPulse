import {register} from "../controllers/authController.js";
import {login} from "../controllers/authController.js";
import { Router } from "express";
import authMiddleWare from "../middleware/authMiddleware.js";

const router = Router();

router.post('/register' , register);
router.post('/login' , login);

export default router;

