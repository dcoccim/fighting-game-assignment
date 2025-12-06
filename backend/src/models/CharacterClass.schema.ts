import mongoose, { Document } from "mongoose";
import type { CharacterClassType } from "../types/types.js";

export interface CharacterClassDocument extends Document, CharacterClassType {}

const BaseStatsSchema = new mongoose.Schema({
    hp: { type: Number, required: true },
    att: { type: Number, required: true },
    def: { type: Number, required: true },
    mAtt: { type: Number, required: true },
    mDef: { type: Number, required: true },
    speed: { type: Number, required: true }
}, { _id: false });

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    baseDamage: { type: Number, required: true },
    elementalType: { type: String, required: true, enum: ['fire', 'water', 'thunder'] }
}, { _id: false });

const CharacterClassSchema = new mongoose.Schema<CharacterClassDocument>({
    name: { type: String, required: true },
    baseStats: { type: BaseStatsSchema, required: true },
    preferredWeapon: { type: String, required: true, enum: ['sword', 'dagger', 'staff'] },
    skills: { type: [SkillSchema], required: true }
});

export const CharacterClassModel = mongoose.model<CharacterClassDocument>('CharacterClass', CharacterClassSchema);