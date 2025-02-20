import express from "express";
import { register, login,logout,getUser} from "../controllers/authController.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyJwt, getUser);
router.post('/logout',logout)
export default router;
