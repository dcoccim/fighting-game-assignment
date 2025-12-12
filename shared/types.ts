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
    id?: string;
    name: string;
    kind: 'weapon' | 'headGear' | 'bodyGear' | 'legGear';
    stats: StatsModifierType;
    elementalStats: ElementalStatsModifierType;
}

export type WeaponType = 'sword' | 'dagger' | 'staff'

export interface IWeapon extends EquippableType {
    kind: 'weapon';
    weaponType: WeaponType;
    baseDamage: number;
}

export interface IHeadGear extends EquippableType {
    kind: 'headGear'
};

export interface IBodyGear extends EquippableType {
    kind: 'bodyGear'
};

export interface ILegGear extends EquippableType {
    kind: 'legGear'
};

export type EquipmentType = {
    weapon: IWeapon | null;
    headGear: IHeadGear | null;
    bodyGear: IBodyGear | null;
    legGear: ILegGear | null;
}

export type SkillType = {
    name: string;
    baseDamage: number;
    isMagic: boolean;
    elementalType?: keyof ElementalStatsType;
}

export type CharacterClassType = {
    id?: string;
    name: string;
    modifier: StatsModifierType;
    preferredWeapon: WeaponType;
    skills: SkillType[];
}

export type CharacterType = {
    id?: string | null;
    name: string;
    stats: StatsType;
    characterClass: CharacterClassType;
    elementalStats: ElementalStatsType;
    equipment: EquipmentType;
    wins: number;
    losses: number;
}

export type Fighter = CharacterType & { 
    selectSkill: (opponent: CharacterType) => SkillType;
    applyDamage: (amount: number) => void;
}; 

export type ArenaType = {
    currentAttacking: CharacterType;
    currentDefending: CharacterType;
    turn: number;
}