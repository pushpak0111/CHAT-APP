import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile", protectRoute, updateProfile) // call the protect function first to check the user is login or not then calls to the second function ie update profile

router.get("/check", protectRoute, checkAuth);

export default router;    