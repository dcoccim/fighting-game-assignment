export type StatsType = { 
    hp: number;
    att: number; 
    def: number;
    mAtt: number;
    mDef: number; 
    speed: number;
}

export type StatsModifierType = StatsType;

export type ElementalStatsType = {
    fire: number;
    water: number;
    thunder: number; 
}

export type ElementalStatsModifierType = ElementalStatsType;

export type EquippableType = {
    id: string;
    name: string;
    kind: 'weapon' | 'headGear' | 'bodyGear' | 'legGear';
    stats: StatsModifierType;
    elementalStats: ElementalStatsModifierType;
}

export type WeaponType = 'sword' | 'dagger' | 'staff'

export interface Weapon extends EquippableType {
    kind: 'weapon';
    weaponType: WeaponType;
    baseDamage: number;
}

export interface HeadGear extends EquippableType {
    kind: 'headGear'
};

export interface BodyGear extends EquippableType {
    kind: 'bodyGear'
};

export interface LegGear extends EquippableType {
    kind: 'legGear'
};

export type EquipmentType = {
    weapon: Weapon | null;
    headGear: HeadGear | null;
    bodyGear: BodyGear | null;
    legGear: LegGear | null;
}

export type SkillType = {
    name: string;
    baseDamage: number;
    elementalType: keyof ElementalStatsType;
}

export type CharacterClassType = {
    id: string;
    name: string;
    baseStats: StatsType;
    preferredWeapon: WeaponType;
    skills: SkillType[];
}

export type CharacterType = {
    id: string;
    name: string;
    characterClass: CharacterClassType;
    elementalStats: ElementalStatsType;
    equipment: EquipmentType;
    wins: number;
    losses: number;
}

export type Arena = {
    characterList: CharacterType[];
    player1: CharacterType;
    player2: CharacterType;
    turn: number;
}