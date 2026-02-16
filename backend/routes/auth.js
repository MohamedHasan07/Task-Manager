import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// test protected route
router.get("/profile", verifyToken, (req,res)=>{
  res.json(req.user);
});

export default router;
