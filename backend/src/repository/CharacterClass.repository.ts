import { CharacterClassModel } from "../model/CharacterClass.schema.js";
import type { CharacterClassType } from "@shared/types.js";
import { characterClassDocToType } from "./mapper/mappers.js";

async function addCharacterClass(characterClass: CharacterClassType): Promise<CharacterClassType>{
    try {
        const created = await CharacterClassModel.create(characterClass);
        return characterClassDocToType(created);
    } catch (error) {
        throw error;
    }
}

async function getCharacterClassById(id: string): Promise<CharacterClassType | null> {
    try {
        const characterClassDoc = await CharacterClassModel.findById(id).lean().exec();
        return characterClassDocToType(characterClassDoc);
    } catch (error) {
        throw error;
    }
}

async function getAllCharacterClasses(): Promise<CharacterClassType[]> {
    try {
        const characterClassDocs = await CharacterClassModel.find().lean().exec();
        return characterClassDocs.map(doc => characterClassDocToType(doc));
    } catch (error) {
        throw error;
    }
}

export default { addCharacterClass, getCharacterClassById, getAllCharacterClasses };