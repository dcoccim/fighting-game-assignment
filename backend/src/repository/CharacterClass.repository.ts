import { CharacterClassModel } from "../models/CharacterClass.schema.js";
import type { CharacterClassType } from "../types/types.js";

async function addCharacterClass(characterClass: CharacterClassType): Promise<CharacterClassType>{
    try {
        const created = await CharacterClassModel.create(characterClass);
        return created.toObject();
    } catch (error) {
        throw error;
    }
}

export { addCharacterClass };