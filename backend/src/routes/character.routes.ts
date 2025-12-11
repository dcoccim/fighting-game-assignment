import { Router } from "express";
import {
    postCharacter,
    getCharacter,
    getAllCharacters,
    updateCharacter,
    deleteCharacter,
} from "../controller/character.controller.js";

const router = Router();

router.post("/", postCharacter);
router.get("/:id", getCharacter);
router.get("/", getAllCharacters);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);

export default router;