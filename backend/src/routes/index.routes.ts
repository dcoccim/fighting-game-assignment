import { Router } from "express";
import characterRoutes from "./character.routes.js";
import characterClassRoutes from "./characterClass.routes.js";

const router = Router();

router.use("/characters", characterRoutes);
router.use("/classes", characterClassRoutes);

export default router;