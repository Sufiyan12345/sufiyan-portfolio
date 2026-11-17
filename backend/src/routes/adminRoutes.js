import express from "express";

import {
  getContacts,
  getContactStats,
  updateContactStatus,
} from "../controllers/adminController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* =========================================================
   PROTECTED ADMIN ROUTES
========================================================= */

router.use(adminAuth);

router.get("/contacts", getContacts);

router.get(
  "/contacts/stats",
  getContactStats
);

router.patch(
  "/contacts/:id/status",
  updateContactStatus
);

export default router;