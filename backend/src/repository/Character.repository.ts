import { CharacterModel } from "../model/Character.schema.js";
import type { Character } from "../gameObjects/Character.js";
import { characterDocToObj, characterObjToDoc } from "./mapper/mappers.js";

async function addCharacter(character: Character): Promise<Character>{
    try {
        const characterDoc = characterObjToDoc(character);
        const created: any = await CharacterModel.create(characterDoc);
        const populated = await getCharacterById(created._id);
        return populated!;
    } catch (error) {
        throw error;
    }
}

async function updateCharacter(character: Character): Promise<Character>{
    try {
        if(!character.id) {
            throw new Error("Character ID is required for update.");
        }
        const characterDoc = characterObjToDoc(character);
        const updated = await CharacterModel.findByIdAndUpdate(
            character.id,
            characterDoc,
            { new: true }
        )
        .populate({path: 'characterClass', model: 'CharacterClass'})
        .populate({path: 'equipment.weapon', model: 'Equippable'})
        .populate({path: 'equipment.headGear', model: 'Equippable'})
        .populate({path: 'equipment.bodyGear', model: 'Equippable'})
        .populate({path: 'equipment.legGear', model: 'Equippable'})
        .lean()
        .exec();

        if (!updated) {
            throw new Error("Character not found.");
        }

        const updatedCharacter = characterDocToObj(updated);
        return updatedCharacter;
    } catch (error) {
        throw error;
    }
}

async function getCharacterById(id: string): Promise<Character | null> {
    try {
        const characterDoc = await CharacterModel.findById(id)
        .populate({path: 'characterClass', model: 'CharacterClass'})
        .populate({path: 'equipment.weapon', model: 'Equippable'})
        .populate({path: 'equipment.headGear', model: 'Equippable'})
        .populate({path: 'equipment.bodyGear', model: 'Equippable'})
        .populate({path: 'equipment.legGear', model: 'Equippable'})
        .lean()
        .exec();

        if (!characterDoc) {
            return null;
        }
        const character = characterDocToObj(characterDoc);
        return character;

    } catch (error) {
        throw error;
    }
}

async function getAllCharacters(): Promise<Character[]> {
    try {
        const characterDocs = await CharacterModel.find()
        .populate({path: 'characterClass', model: 'CharacterClass'})
        .populate({path: 'equipment.weapon', model: 'Equippable'})
        .populate({path: 'equipment.headGear', model: 'Equippable'})
        .populate({path: 'equipment.bodyGear', model: 'Equippable'})
        .populate({path: 'equipment.legGear', model: 'Equippable'})
        .lean()
        .exec();
        return characterDocs.map(doc => {
            const character = characterDocToObj(doc);
            return character;
        });
    } catch (error) {
        throw error;
    }
}

export default { addCharacter, updateCharacter, getCharacterById, getAllCharacters };