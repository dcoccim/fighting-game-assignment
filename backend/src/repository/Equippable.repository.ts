import { EquippableModel } from "../models/Equippable.schema.js";
import type { EquippableType } from "../types/types.js";

async function addEquippable(equippable: EquippableType): Promise<EquippableType>{
    try {
        const created = await EquippableModel.create(equippable);
        return created.toObject();
    } catch (error) {
        throw error;
    }
}

export { addEquippable };