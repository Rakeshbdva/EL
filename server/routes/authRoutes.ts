import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();
const authController = new AuthController();

// Public routes
router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));

// Protected routes
router.get("/profile", authenticateToken, authController.getProfile.bind(authController));
router.post("/logout", authenticateToken, authController.logout.bind(authController));

export { router as authRoutes };