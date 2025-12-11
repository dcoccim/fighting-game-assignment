import CharacterClassRepository from "../repository/CharacterClass.repository.js";
import type { CharacterClassType } from "@shared/types.js";

async function addCharacterClass(characterClassData: CharacterClassType): Promise<CharacterClassType> {
    try {
        console.debug("Creating new character class with data:", characterClassData);
        const createdClass = await CharacterClassRepository.addCharacterClass(characterClassData);
        console.info(`Created character class: ${createdClass.name} (ID: ${createdClass.id})`);
        return createdClass;
    } catch (error) {
        console.error("Error creating character class:", error);
        throw error;
    }
}

async function getCharacterClassById(id: string): Promise<CharacterClassType | null> {
    try {
        console.debug(`Fetching character class with ID: ${id}`);
        const characterClass = await CharacterClassRepository.getCharacterClassById(id);
        if (characterClass) {
            console.info(`Fetched character class: ${characterClass.name} (ID: ${characterClass.id})`);
        } else {
            console.warn(`Character class with ID: ${id} not found.`);
        }
        return characterClass;
    } catch (error) {
        console.error(`Error fetching character class with ID: ${id}`, error);
        throw error;
    }
}

async function getAllCharacterClasses(): Promise<CharacterClassType[]> {
    try {
        console.debug("Fetching all character classes...");
        const characterClasses = await CharacterClassRepository.getAllCharacterClasses();
        console.info(`Fetched ${characterClasses.length} character classes.`);
        return characterClasses;
    } catch (error) {
        console.error("Error fetching character classes:", error);
        throw error;
    }
}

export default { addCharacterClass, getCharacterClassById, getAllCharacterClasses };