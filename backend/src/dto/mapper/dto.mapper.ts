import type { CharacterClassType, CharacterType, EquippableType, IWeapon } from "../../../../shared/types.js";
import type { Character } from "../../gameObjects/Character.js";
import type { CharacterResponseDTO } from "../character.dto.js";
import type { CharacterClassResponseDTO } from "../characterClass.dto.js";
import type { EquippableListResponseDTO, EquippableResponseDTO, WeaponResponseDTO } from "../equippable.dto.js";

export function toCharacterResponse(character: Character): CharacterResponseDTO {
    return {
        id: character.id ?? null,
        name: character.name,
        characterClass: {
            name: character.characterClass.name,
        },
        stats: {
            hp: character.stats.hp,
            att: character.stats.att,
            def: character.stats.def,
            mAtt: character.stats.mAtt,
            mDef: character.stats.mDef,
            speed: character.stats.speed,
        },
        elementalStats: {
            fire: character.elementalStats.fire,
            water: character.elementalStats.water,
            thunder: character.elementalStats.thunder,
        },
        equipment: {
            weapon: character.equipment.weapon ? {
                id: character.equipment.weapon.id!,
                name: character.equipment.weapon.name,
                weaponType: (character.equipment.weapon as IWeapon).weaponType,
            } : null,
            headGear: character.equipment.headGear ? {
                id: character.equipment.headGear.id!,
                name: character.equipment.headGear.name,
            } : null,
            bodyGear: character.equipment.bodyGear ? {
                id: character.equipment.bodyGear.id!,
                name: character.equipment.bodyGear.name,
            } : null,
            legGear: character.equipment.legGear ? {
                id: character.equipment.legGear.id!,
                name: character.equipment.legGear.name,
            } : null
        },
        wins: character.wins,
        losses: character.losses,
    }
}

export function toCharacterClassResponse(characterClass: CharacterClassType): CharacterClassResponseDTO {
    return {
        id: characterClass.id ?? null,
        name: characterClass.name,
        preferredWeapon: characterClass.preferredWeapon,
    };
}

export function toEquippableResponse(equippable: EquippableType): EquippableResponseDTO {
    return {
        id: equippable.id ?? null,
        name: equippable.name,
        kind: equippable.kind,
    };
}

export function toWeaponResponse(equippable: IWeapon): WeaponResponseDTO {
    return {
        id: equippable.id ?? null,
        name: equippable.name,
        kind: equippable.kind,
        weaponType: equippable.weaponType,
        baseDamage: equippable.baseDamage,
    };
}

export function toEquippableListResponse(equippables: EquippableType[]): EquippableListResponseDTO {
    const response: EquippableListResponseDTO = {
        weapon: [],
        headGear: [],
        bodyGear: [],
        legGear: [],
    };

    for(const equippable of equippables) {

        if(equippable.kind === 'weapon') {
            const weapon = equippable as IWeapon;
            response.weapon.push(toWeaponResponse(weapon));
            continue;
        } else if(equippable.kind === 'headGear') {
            response.headGear.push(toEquippableResponse(equippable));
        } else if(equippable.kind === 'bodyGear') {
            response.bodyGear.push(toEquippableResponse(equippable));
        } else if(equippable.kind === 'legGear') {
            response.legGear.push(toEquippableResponse(equippable));
        }
    }

    return response;
}