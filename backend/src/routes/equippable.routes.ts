import { Router } from "express";
import { getEquippables } from "../controller/equippable.controller.js";

const router = Router();

router.get("/", getEquippables);

export default router;