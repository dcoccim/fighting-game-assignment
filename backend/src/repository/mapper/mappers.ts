import mongoose from "mongoose";
import { Character } from "../../gameObjects/Character.js";
import type { IBodyGear, CharacterClassType, CharacterType, EquipmentType, EquippableType, IHeadGear, ILegGear, IWeapon } from "@shared/types.js";

export function objectIdToString(oid: any): string {
    return oid.toString();
}

export function stringToObjectId(id: string): any {
    return new mongoose.Types.ObjectId(id);
}

export function characterObjToDoc(character: Character): any {
    return {
        id: character.id ? stringToObjectId(character.id) : undefined,
        name: character.name,
        characterClass: stringToObjectId(character.characterClass.id!),
        equipment: {
            weapon: character.equipment.weapon ? stringToObjectId(character.equipment.weapon.id!) : null,
            headGear: character.equipment.headGear ? stringToObjectId(character.equipment.headGear.id!) : null,
            bodyGear: character.equipment.bodyGear ? stringToObjectId(character.equipment.bodyGear.id!) : null,
            legGear: character.equipment.legGear ? stringToObjectId(character.equipment.legGear.id!) : null
        },
        wins: character.wins,
        losses: character.losses
    };
}

export function equippableDocToType(doc: any): EquippableType | null {
    if (!doc) return null;
    return {
        id: doc._id.toString(),
        name: doc.name,
        kind: doc.kind,
        stats: doc.stats,
        elementalStats: doc.elementalStats,
        ...(doc.kind === 'weapon' ? { weaponType: doc.weaponType, baseDamage: doc.baseDamage } : {})
    } as EquippableType;
}

export function characterClassDocToType(doc: any): CharacterClassType {
    return {
        id: doc._id.toString(),
        name: doc.name,
        modifier: doc.modifier,
        preferredWeapon: doc.preferredWeapon,
        skills: doc.skills
    } as CharacterClassType;
}

export function characterDocToObj(doc: any): Character {

    const character = new Character({
        id: doc._id.toString(),
        name: doc.name,
        characterClass: characterClassDocToType(doc.characterClass),
        equipment: {
            weapon: equippableDocToType(doc.equipment.weapon) as IWeapon,
            headGear: equippableDocToType(doc.equipment.headGear) as IHeadGear,
            bodyGear: equippableDocToType(doc.equipment.bodyGear) as IBodyGear,
            legGear: equippableDocToType(doc.equipment.legGear) as ILegGear
        },
        wins: doc.wins,
        losses: doc.losses
    });

    character.calculateTotalStats();
    character.calculateTotalElem();

    return character;
}