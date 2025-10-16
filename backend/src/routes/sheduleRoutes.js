import express from "express";
import { getSchedules, createSchedule, deleteSchedule } from "../controllers/scheduleController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.get("/all", authMiddleware, getSchedules);
router.post("/create", authMiddleware, createSchedule);
router.delete("/delete/:id", authMiddleware, deleteSchedule);

export default router;
