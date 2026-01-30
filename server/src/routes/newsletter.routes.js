import express from "express";
import {
  getNewsletters,
  getNewsletterById,
  getNewsletterBySlug,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from "../controllers/newsletter.controller.js";
import { requireAdmin, requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getNewsletters);
router.get("/slug/:slug", getNewsletterBySlug);

// Admin-only routes
router.get("/:id", requireAdmin, getNewsletterById);
router.post("/", requireAdmin, createNewsletter);
router.put("/:id", requireAdmin, updateNewsletter);
router.delete("/:id", requireAdmin, deleteNewsletter);

export default router;
