import express from "express";

import {
  loginAdmin,
  getCurrentAdmin,
} from "../controllers/authController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/me", adminAuth, getCurrentAdmin);

export default router;