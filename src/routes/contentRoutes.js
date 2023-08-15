// import express from "express";
// import contentController from "../controllers/contentController.js";
// import authenticateMiddleware from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.use(authenticateMiddleware);

// router.get("/", contentController.getAllContents);
// router.get("/:id", contentController.getContentById);
// router.post("/", contentController.createContent);
// router.put("/:id", contentController.updateContent);
// router.delete("/:id", contentController.deleteContent);

// export default router;

import express from "express";
import contentController from "../controllers/contentController.js";
import authenticateMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticateMiddleware);

router.get("/", contentController.getAllContents);
router.get("/:id", contentController.getContentById);
router.post("/", contentController.createContent);
router.put("/:id", contentController.updateContent);
router.delete("/:id", contentController.deleteContent);

export default router;
