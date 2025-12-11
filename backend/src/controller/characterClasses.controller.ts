import { toCharacterClassResponse } from "../dto/mapper/dto.mapper.js";
import characterClassService from "../service/characterClass.service.js";
import type { CharacterClassListResponseDTO } from "../dto/characterClass.dto.js";
import type { Request, Response } from "express";

export async function getCharacterClasses(req: Request, res: Response): Promise<void> {
    try {
        const characterClasses = await characterClassService.getAllCharacterClasses();
        const characterClassListResponse: CharacterClassListResponseDTO = characterClasses.map(
            charClass => toCharacterClassResponse(charClass)
        ); 
        res.status(200).json(characterClassListResponse);
    } catch (error) {
        console.error("Error fetching character classes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}