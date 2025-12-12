import type { Request, Response } from "express";
import equippableService from "../service/equippable.service.js";
import type { EquippableListResponseDTO } from "../dto/equippable.dto.js";
import { toEquippableListResponse } from "../dto/mapper/dto.mapper.js";

export async function getEquippables(req: Request, res: Response): Promise<void> {
    try {
        const equippables = await equippableService.getAllEquippables();
        const equippableListResponse: EquippableListResponseDTO = toEquippableListResponse(equippables);
        res.status(200).json(equippableListResponse);
    } catch (error) {
        console.error("Error fetching equippables:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}