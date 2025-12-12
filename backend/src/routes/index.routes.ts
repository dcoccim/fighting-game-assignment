import { Router } from "express";
import characterRoutes from "./character.routes.js";
import characterClassRoutes from "./characterClass.routes.js";
import equippableRoutes from "./equippable.routes.js";

const router = Router();

router.use("/characters", characterRoutes);
router.use("/classes", characterClassRoutes);
router.use("/equippables", equippableRoutes);

export default router;