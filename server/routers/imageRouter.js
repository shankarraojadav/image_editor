import express from "express";
import { ImageUploader } from "../controllers/imageController.js";
import uploader from "../middleWares/uploader.js";

const router = express.Router();

router.post("/upload", uploader.single("image"), ImageUploader);

export default router;
