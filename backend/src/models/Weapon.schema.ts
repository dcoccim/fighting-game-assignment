import mongoose from "mongoose";
import { EquippableModel, type EquippableDocument } from "./Equippable.schema.js";
import type { WeaponType } from "../types/types.js";

export interface WeaponDocument extends EquippableDocument {
    weaponType: WeaponType;
    baseDamage: number;
}

const WeaponSchema = new mongoose.Schema<Partial<WeaponDocument>>({
    weaponType: { type: String, required: true, enum: ['sword', 'dagger', 'staff'] },
    baseDamage: { type: Number, required: true }
});

export const WeaponModel = EquippableModel.discriminator<WeaponDocument>('weapon', WeaponSchema);