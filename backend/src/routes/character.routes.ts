import { Router } from "express";
import {
    postCharacter,
    getCharacter,
    getAllCharacters,
    updateCharacterEquip,
    battle
} from "../controller/character.controller.js";

const router = Router();

router.post("/", postCharacter);
router.get("/:id", getCharacter);
router.get("/", getAllCharacters);
router.put("/:id/equip", updateCharacterEquip);
router.post("/battle", battle);

export default router;