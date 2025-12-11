import { Router } from "express";
import { getCharacterClasses } from "../controller/characterClasses.controller.js";

const router = Router();

router.get("/", getCharacterClasses);

export default router;