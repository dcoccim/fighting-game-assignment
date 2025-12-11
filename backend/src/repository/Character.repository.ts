import mongoose from "mongoose";
import { CharacterModel } from "../model/Character.schema.js";
import type { CharacterType } from "@shared/types.js";
import { characterDocToType, characterTypeToDoc } from "./mapper/mappers.js";

async function addCharacter(character: CharacterType): Promise<CharacterType>{
    try {
        const characterDoc = characterTypeToDoc(character);
        const created: any = await CharacterModel.create(characterDoc);
        const populated = await getCharacterById(created._id);
        return populated!;
    } catch (error) {
        throw error;
    }
}

async function updateCharacter(character: CharacterType): Promise<CharacterType>{
    try {
        if(!character.id) {
            throw new Error("Character ID is required for update.");
        }
        const characterDoc = characterTypeToDoc(character);
        const updated = await CharacterModel.findByIdAndUpdate(
            character.id,
            characterDoc,
        ).exec();

        if (!updated) {
            throw new Error("Character not found.");
        }

        return characterDocToType(updated);
    } catch (error) {
        throw error;
    }
}

async function getCharacterById(id: string): Promise<CharacterType | null> {
    try {
        const characterDoc = await CharacterModel.findById(id)
        .populate({path: 'characterClass', model: 'CharacterClass'})
        .populate({path: 'equipment.weapon', model: 'Equippable'})
        .populate({path: 'equipment.headGear', model: 'Equippable'})
        .populate({path: 'equipment.bodyGear', model: 'Equippable'})
        .populate({path: 'equipment.legGear', model: 'Equippable'})
        .lean()
        .exec();
        return characterDoc ? characterDocToType(characterDoc) : null;
    } catch (error) {
        throw error;
    }
}

async function getAllCharacters(): Promise<CharacterType[]> {
    try {
        const characterDocs = await CharacterModel.find()
        .populate({path: 'characterClass', model: 'CharacterClass'})
        .populate({path: 'equipment.weapon', model: 'Equippable'})
        .populate({path: 'equipment.headGear', model: 'Equippable'})
        .populate({path: 'equipment.bodyGear', model: 'Equippable'})
        .populate({path: 'equipment.legGear', model: 'Equippable'})
        .lean()
        .exec();
        return characterDocs.map(doc => characterDocToType(doc));
    } catch (error) {
        throw error;
    }
}

export default { addCharacter, updateCharacter, getCharacterById, getAllCharacters };