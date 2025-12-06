import mongoose, { Document } from "mongoose";
import type { CharacterType } from "../types/types.js";

type PersistedCharacterBase = Omit<CharacterType, 'characterClass' | 'equipment'>;

export interface CharacterDocument extends Document, PersistedCharacterBase {
    characterClass: mongoose.Types.ObjectId;
    equipment: {
        weapon: mongoose.Types.ObjectId | null;
        headGear: mongoose.Types.ObjectId | null;
        bodyGear: mongoose.Types.ObjectId | null;
        legGear: mongoose.Types.ObjectId | null;
    }
}

const EquipmentSchema = new mongoose.Schema({
    weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Equippable', default: null },
    headGear: { type: mongoose.Schema.Types.ObjectId, ref: 'Equippable', default: null },
    bodyGear: { type: mongoose.Schema.Types.ObjectId, ref: 'Equippable', default: null },
    legGear: { type: mongoose.Schema.Types.ObjectId, ref: 'Equippable', default: null }
}, { _id: false });

const ElementalStatsSchema = new mongoose.Schema({
    fire: { type: Number, required: true, default: 0 },
    water: { type: Number, required: true, default: 0 },
    thunder: { type: Number, required: true, default: 0 }
}, { _id: false });

const CharacterSchema = new mongoose.Schema<CharacterDocument>({
    name: { type: String, required: true },
    characterClass: { type: mongoose.Schema.Types.ObjectId, ref: 'CharacterClass', required: true },
    elementalStats: { type: ElementalStatsSchema, required: true },
    equipment: { type: EquipmentSchema, required: true },
    wins: { type: Number, required: true, default: 0 },
    losses: { type: Number, required: true, default: 0 }
}, { timestamps: true });

export const CharacterModel = mongoose.model<CharacterDocument>('Character', CharacterSchema);


