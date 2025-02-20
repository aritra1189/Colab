import express from "express";
import { saveCode, getCode } from "../controllers/codeController.js";
import {verifyJwt } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/save", verifyJwt, saveCode);
router.get("/:roomId", verifyJwt, getCode);


export default router;
