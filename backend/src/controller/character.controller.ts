import characterService from "../service/character.service.js";
import { toCharacterResponse } from "../dto/mapper/dto.mapper.js";
import type { Request, Response } from "express";
import { IncompatibleEquipError } from "../utils/errors.js";

export async function postCharacter(req: Request, res: Response): Promise<void> {
    const characterData = req.body;
    if (!characterData || !characterData.name || !characterData.characterClassId) {
        console.warn("Invalid character data received:", characterData);
        res.status(400).send("Invalid character data");
        return;
    }
    try {
        const newCharacter = await characterService.addCharacter(characterData);
        console.log("Character created:", newCharacter);
        const characterResponse = toCharacterResponse(newCharacter);
        res.status(201).json(characterResponse);
    } catch (error) {
        console.error("Error creating character:", error);
        res.status(500).send("Error creating character");
    }
}

export async function getCharacter(req: Request, res: Response): Promise<void> {
    const characterId = req.params.id;
    if (!characterId) {
        console.warn("Character ID is missing in request parameters");
        res.status(400).send("Character ID is required");
        return;
    }
    try {
        const character = await characterService.getCharacterById(characterId);
        if (character) {
            console.log("Character retrieved:", character);
            const characterResponse = toCharacterResponse(character);
            res.status(200).json(characterResponse);
        } else {
            res.status(404).send("Character not found");
        }
    } catch (error) {
        console.error("Error retrieving character:", error);
        res.status(500).send("Error retrieving character");
    }
}

export async function getAllCharacters(req: Request, res: Response): Promise<void> {
    try {
        const characters = await characterService.getAllCharacters();
        console.log("Characters retrieved:", characters);
        const characterListResponse = characters.map(character => toCharacterResponse(character));
        res.status(200).json(characterListResponse);
    } catch (error) {
        console.error("Error retrieving characters:", error);
        res.status(500).send("Error retrieving characters");
    }
}

export async function updateCharacterEquip(req: Request, res: Response): Promise<void> {
    try {
        const characterId = req.params.id;
        if (!characterId) {
            console.warn("Character ID is missing in request parameters");
            res.status(400).send("Character ID is required");
            return;
        }
        const equipmentData = req.body;
        const updatedCharacter = await characterService.updateCharacterEquip(characterId, equipmentData);
        console.log("Character equipment updated:", updatedCharacter);
        const characterResponse = toCharacterResponse(updatedCharacter!);
        res.status(200).json(characterResponse);
    } catch (error) {
        if (error instanceof IncompatibleEquipError) {
            console.warn("Incompatible equipment error:", error.message);
            res.status(400).json({ message: error.message });
            return;
        }
        console.error("Error updating character equipment:", error);
        res.status(500).send("Error updating character equipment");
    }
}

export function deleteCharacter(req: Request, res: Response): void {
    res.status(200).send("Character deleted");
}