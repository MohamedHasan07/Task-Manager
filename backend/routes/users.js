import express from "express";
import { getUsers, deleteUser } from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// GET all users (admin)
router.get("/", verifyToken, isAdmin, getUsers);

// DELETE user (admin)
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;
