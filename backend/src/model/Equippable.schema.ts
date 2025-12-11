import mongoose, { Document } from "mongoose";
import type { EquippableType } from "@shared/types.js";

export interface EquippableDocument extends Document, EquippableType {}

const StatsModifierSchema = new mongoose.Schema({
    hp: { type: Number, required: true, default: 0 },
    att: { type: Number, required: true, default: 0 },
    def: { type: Number, required: true, default: 0 },
    mAtt: { type: Number, required: true, default: 0 },
    mDef: { type: Number, required: true, default: 0 },
    speed: { type: Number, required: true, default: 0 }
}, { _id: false });

const ElementalStatsModifierSchema = new mongoose.Schema({
    fire: { type: Number, required: true, default: 0 },
    water: { type: Number, required: true, default: 0 },
    thunder: { type: Number, required: true, default: 0 }
}, { _id: false });

const EquippableSchema = new mongoose.Schema<EquippableDocument>({
    name: { type: String, required: true },
    stats: { type: StatsModifierSchema, required: true },
    elementalStats: { type: ElementalStatsModifierSchema, required: true },
    kind: { type: String, required: true, enum: ['weapon', 'headGear', 'bodyGear', 'legGear'] }
}, { discriminatorKey: 'kind' });

export const EquippableModel = mongoose.model<EquippableDocument>('Equippable', EquippableSchema);