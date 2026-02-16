import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

import {
  getTasks,
  updateTask,
  deleteTask,
  getStats,        // ⭐ IMPORTANT
  getUsers,
  assignTask,
  getMyTasks,
  submitWork,
  approveTask
} from "../controllers/taskController.js";

const router = express.Router();

/* ADMIN ROUTES */
router.get("/", verifyToken, isAdmin, getTasks);
router.get("/admin/stats", verifyToken, isAdmin, getStats);  // ⭐ ADD THIS
router.get("/admin/users", verifyToken, isAdmin, getUsers);
router.post("/admin/assign", verifyToken, isAdmin, assignTask);
router.patch("/approve/:id", verifyToken, isAdmin, approveTask);

/* USER ROUTES */
router.get("/my", verifyToken, getMyTasks);
router.patch("/submit/:id", verifyToken, submitWork);

/* COMMON ROUTES */
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, isAdmin, deleteTask);

export default router;
