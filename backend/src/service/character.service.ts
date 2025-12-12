import { get } from "http";
import type { CreateCharacterDTO } from "../dto/character.dto.js";
import { Character } from "../gameObjects/Character.js";
import characterRepository from "../repository/Character.repository.js";
import characterClassService from "./characterClass.service.js";
import type { CharacterType, EquipmentType, EquippableType } from "@shared/types.js";
import equippableService from "./equippable.service.js";
import { IncompatibleEquipError } from "../utils/errors.js";
import { Arena } from "../gameObjects/Arena.js";

async function addCharacter(characterData: CreateCharacterDTO) : Promise<Character> {
    try {
        console.debug("Creating new character with data:", characterData);
        const characterClass = await characterClassService.getCharacterClassById(characterData.characterClassId);
        if (!characterClass) {
            throw new Error(`Character class with ID ${characterData.characterClassId} not found.`);
        }
        const newCharacter = new Character({name: characterData.name, characterClass});
        const createdCharacter = await characterRepository.addCharacter(newCharacter);
        console.info(`Created character: ${createdCharacter.name} (ID: ${createdCharacter.id})`);
        return createdCharacter;
    } catch (error) {
        console.error("Error creating new character:", error);
        throw error;
    }
}

async function getCharacterById(id: string): Promise<Character | null> {
    try {
        console.debug(`Fetching character with ID: ${id}`);
        const character = await characterRepository.getCharacterById(id);
        if (character) {
            console.info(`Fetched character: ${character.name} (ID: ${character.id})`);
        } else {
            console.warn(`Character with ID: ${id} not found.`);
        }
        return character;
    } catch (error) {
        console.error(`Error fetching character with ID: ${id}`, error);
        throw error;
    }
}

async function getAllCharacters(): Promise<Character[]> {
    try {
        console.debug("Fetching all characters...");
        const characters = await characterRepository.getAllCharacters();
        console.info(`Fetched ${characters.length} characters.`);
        return characters;
    } catch (error) {
        console.error("Error fetching characters:", error);
        throw error;
    }
}

async function updateCharacterEquip(characterId: string, equipmentData: any): Promise<Character | null> {
    try {
        console.debug(`Updating equipment for character ID: ${characterId} with data:`, equipmentData);
        const character = await getCharacterById(characterId);
        if (!character) {
            throw new Error(`Character with ID ${characterId} not found.`);
        }

        for (const slot in equipmentData) {
            const equippable = equipmentData[slot];
            if (equippable) {
                const existing = await equippableService.getEquippableById(equippable.id);
                if (!existing) {
                    throw new Error(`Equippable with ID ${equippable.id} not found.`);
                }
                character.equipItem(slot as keyof EquipmentType, existing);
            } else {
                character.equipItem(slot as keyof EquipmentType, null);
            }
        }
        const updatedCharacter = await characterRepository.updateCharacter(character);
        console.info(`Updated equipment for character: ${updatedCharacter.name} (ID: ${updatedCharacter.id})`);
        return updatedCharacter;
    } catch (error) {
        if (error instanceof IncompatibleEquipError) {
            console.warn(`Incompatible equipment error for character ID: ${characterId} - ${error.message}`);
        } else {
            console.error(`Error updating equipment for character ID: ${characterId}`, error);
        }
        throw error;
    }
}

async function battle(character1Id: string, character2Id: string): Promise<{winner: Character; loser: Character, log: string[]}> {
    try {
        console.debug(`Initiating battle between characters ${character1Id} and ${character2Id}`);
        const character1 = await getCharacterById(character1Id);
        const character2 = await getCharacterById(character2Id);

        if (!character1 || !character2) {
            throw new Error("Characters not found for battle.");
        }
        const arena = new Arena(character1, character2);
        const winner = arena.startBattle();
        console.info(`Battle completed between characters ${character1.name} and ${character2.name}`);
        arena.currentAttacking.wins += 1;
        arena.currentDefending.losses += 1;
        const updatedWinner = await characterRepository.updateCharacter(arena.currentAttacking);
        const updatedLoser = await characterRepository.updateCharacter(arena.currentDefending);
        return { winner: updatedWinner, loser: updatedLoser, log: arena.battleLog };
    } catch (error) {
        console.error(`Error during battle between characters ${character1Id} and ${character2Id}:`, error);
        throw error;
    }
}

export default { addCharacter, getCharacterById, getAllCharacters, updateCharacterEquip, battle };