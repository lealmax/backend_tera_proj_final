import express from "express";
import contentController from "../controllers/contentController.js";

const router = express.Router();

router.get("/", contentController.getAllContents);
router.get("/:id", contentController.getContentById);
router.post("/", contentController.createContent);
router.put("/:id", contentController.updateContent);
router.delete("/:id", contentController.deleteContent);

export default router;
