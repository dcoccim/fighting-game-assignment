import type { EquippableListResponseDTO } from "./equippable.dto.js";

export type CreateCharacterDTO = {
    name: string;
    characterClassId: string;
};

export type UpdateCharacterDTO = {
    id: string;
    name?: string;
    characterClassId?: string;
    equipmentIds?: {
        weaponId?: string;
        headGearId?: string;
        bodyGearId?: string;
        legGearId?: string;
    }
};

export type CharacterResponseDTO = {
    id: string | null;
    name: string;
    characterClass: {
        name: string;
    };
    stats: {
        hp: number;
        att: number;
        def: number;
        mAtt: number;
        mDef: number;
        speed: number;
    };
    elementalStats: {
        fire: number;
        water: number;
        thunder: number;
    };
    equipment: {
        weapon: {
            id: string;
            name: string;
            weaponType: string;
        } | null,
        headGear: {
            id: string;
            name: string;
        } | null,
        bodyGear: {
            id: string;
            name: string;
        } | null,
        legGear: {
            id: string;
            name: string;
        } | null,
    }
    wins: number;
    losses: number;
};

export type CharacterListResponseDTO = CharacterResponseDTO[];