import { EquippableModel } from "../model/Equippable.schema.js";
import { WeaponModel } from "../model/Weapon.schema.js";
import type { EquippableType, IWeapon } from "@shared/types.js";
import { equippableDocToType } from "./mapper/mappers.js";

async function addEquippable(equippable: EquippableType): Promise<EquippableType>{
    try {
        const isWeapon = equippable.kind === "weapon";

        if(isWeapon) {
            const created = await WeaponModel.create(equippable);
            return equippableDocToType(created) as IWeapon;
        } else {
            const created = await EquippableModel.create(equippable);
            return equippableDocToType(created) as EquippableType;
        }
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

async function getAllEquippables(): Promise<EquippableType[]> {
    try {
        const equippableDocs = await EquippableModel.find().lean().exec();
        return equippableDocs.map(equippableDocToType) as EquippableType[];
    } catch (error) {
        throw error;
    }
}

export default { addEquippable, getEquippableById, getAllEquippables };