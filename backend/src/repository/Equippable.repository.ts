import { EquippableModel } from "../model/Equippable.schema.js";
import { WeaponModel } from "../model/Weapon.schema.js";
import type { EquippableType } from "@shared/types.js";
import { equippableDocToType } from "./mapper/mappers.js";

async function addEquippable(equippable: EquippableType): Promise<EquippableType>{
    try {
        const created = equippable.kind === "weapon" ? 
            await WeaponModel.create(equippable) : 
            await EquippableModel.create(equippable);
        return equippableDocToType(created) as EquippableType;
    } catch (error) {
        throw error;
    }
}

async function getEquippableById(id: string): Promise<EquippableType | null> {
    try {
        const equippableDoc = await EquippableModel.findById(id).lean().exec();
        return equippableDocToType(equippableDoc);
    } catch (error) {
        throw error;
    }
}

export default { addEquippable, getEquippableById };