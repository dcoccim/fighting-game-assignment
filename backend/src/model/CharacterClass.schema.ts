import mongoose, { Document } from "mongoose";
import type { CharacterClassType } from "@shared/types.js";

export interface CharacterClassDocument extends Document, CharacterClassType {}

const StatsModifierSchema = new mongoose.Schema({
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
    isMagic: { type: Boolean, required: true },
    elementalType: { type: String, required: false, enum: ['fire', 'water', 'thunder'] }
}, { _id: false });

const CharacterClassSchema = new mongoose.Schema<CharacterClassDocument>({
    name: { type: String, required: true },
    modifier: { type: StatsModifierSchema, required: true },
    preferredWeapon: { type: String, required: true, enum: ['sword', 'dagger', 'staff'] },
    skills: { type: [SkillSchema], required: true }
});

export const CharacterClassModel = mongoose.model<CharacterClassDocument>('CharacterClass', CharacterClassSchema);