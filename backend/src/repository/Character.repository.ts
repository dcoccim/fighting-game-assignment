import mongoose from "mongoose";
import { CharacterModel } from "../models/Character.schema.js";
import type { CharacterType } from "../types/types.js";

type PersistedEquipment = {
  weapon: mongoose.Types.ObjectId | null;
  headGear: mongoose.Types.ObjectId | null;
  bodyGear: mongoose.Types.ObjectId | null;
  legGear: mongoose.Types.ObjectId | null;
};

export type PersistedCharacterInput = Omit<CharacterType, 'characterClass' | 'equipment'> & {
  characterClass: mongoose.Types.ObjectId;
  equipment: PersistedEquipment;
};

async function addCharacter(character: CharacterType): Promise<CharacterType>{
    const persistCharacter: PersistedCharacterInput = {
        id: character.id,
        name: character.name,
        characterClass: new mongoose.Types.ObjectId((character.characterClass as any)._id),
        elementalStats: character.elementalStats,
        equipment: {
            weapon: character.equipment.weapon ? new mongoose.Types.ObjectId((character.equipment.weapon as any)._id) : null,
            headGear: character.equipment.headGear ? new mongoose.Types.ObjectId((character.equipment.headGear as any)._id) : null,
            bodyGear: character.equipment.bodyGear ? new mongoose.Types.ObjectId((character.equipment.bodyGear as any)._id) : null,
            legGear: character.equipment.legGear ? new mongoose.Types.ObjectId((character.equipment.legGear as any)._id) : null,
        },
        wins: character.wins,
        losses: character.losses
    };
    try {
        const created = await CharacterModel.create(persistCharacter);
        const fullCharacter = await getCharacterById(created._id.toString());
        return fullCharacter as CharacterType;
    } catch (error) {
        throw error;
    }
}

async function getCharacterById(id: string): Promise<CharacterType | null> {
    try {
        const character = await CharacterModel.findById(id)
        .populate({path: 'characterClass', model: 'CharacterClass'})
        .populate({path: 'equipment.weapon', model: 'Equippable'})
        .populate({path: 'equipment.headGear', model: 'Equippable'})
        .populate({path: 'equipment.bodyGear', model: 'Equippable'})
        .populate({path: 'equipment.legGear', model: 'Equippable'})
        .lean()
        .exec();
        if (character) {
            character.id = character._id.toString();
        }
        return character as CharacterType | null;
    } catch (error) {
        throw error;
    }
}

export { addCharacter, getCharacterById };