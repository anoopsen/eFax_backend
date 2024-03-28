import express from "express";
import { DocumnetController } from "./controllers.js";

const router = express.Router();

router.get("/", DocumnetController.CreateDocument);

export default router;