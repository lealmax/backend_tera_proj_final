import express from "express";
import authController from "../controllers/authContoller.js";

const router = express.Router();

router.post("/login", authController.authenticateUser);

export default router;
