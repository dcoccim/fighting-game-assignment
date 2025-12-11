import type { CharacterClassType, CharacterType } from "../../../../shared/types.js";
import type { CharacterResponseDTO } from "../character.dto.js";
import type { CharacterClassResponseDTO } from "../characterClass.dto.js";

export function toCharacterResponse(character: CharacterType): CharacterResponseDTO {
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
                name: character.equipment.weapon.name, 
                weaponType: character.equipment.weapon.weaponType 
            } : null,
            headGear: character.equipment.headGear?.name || null,
            bodyGear: character.equipment.bodyGear?.name || null,
            legGear: character.equipment.legGear?.name || null,
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