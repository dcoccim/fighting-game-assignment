import type { CreateCharacterDTO } from "../dto/character.dto.js";
import { Character } from "../gameObjects/Character.js";
import characterRepository from "../repository/Character.repository.js";
import characterClassService from "./characterClass.service.js";
import type { CharacterType } from "@shared/types.js";

async function addCharacter(characterData: CreateCharacterDTO) : Promise<CharacterType> {
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

async function getCharacterById(id: string): Promise<CharacterType | null> {
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

async function getAllCharacters(): Promise<CharacterType[]> {
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

export default { addCharacter, getCharacterById, getAllCharacters };