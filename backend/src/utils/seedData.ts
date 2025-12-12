import type { ElementalStatsModifierType, SkillType, StatsModifierType, IWeapon, WeaponType, IBodyGear, IHeadGear, ILegGear } from "@shared/types.js";

export const seedData = {
    classes: [
        {
            name: "Mage",
            modifier: {
                hp: -10,
                att: 0,
                mAtt: 20,
                def: -5,
                mDef: 10,
                speed: 0
            },
            preferredWeapon: "staff" as WeaponType,
            skills: [
                {
                    name: "Fire",
                    baseDamage: 40,
                    elementalType: "fire"
                },
                {
                    name: "Blizzard",
                    baseDamage: 35,
                    elementalType: "water"
                },
                {
                    name: "Thunder",
                    baseDamage: 45,
                    elementalType: "thunder"
                }
            ] as SkillType[]
        },
        {
            name: "Warrior",
            modifier: {
                hp: 20,
                att: 15,
                mAtt: -5,
                def: 10,
                mDef: 0,
                speed: -5
            },
            preferredWeapon: "sword" as WeaponType,
            skills: [
                {
                    name: "Slash",
                    baseDamage: 50,
                },
                {
                    name: "Smash",
                    baseDamage: 45,
                },
                {
                    name: "Charge",
                    baseDamage: 40,
                }
            ] as SkillType[]
        }
    ],
    equippables: {
        weapons: [
            {
                name: "Wooden Staff",
                kind: "weapon",
                weaponType: "staff" as WeaponType,
                baseDamage: 1,
                stats: {
                    hp: 0,
                    att: 5,
                    mAtt: 10,
                    def: 0,
                    mDef: 0,
                    speed: 0
                } as StatsModifierType,
                elementalStats: {
                    fire: 0.1,
                    water: 0.1,
                    thunder: 0.1
                } as ElementalStatsModifierType
            },
            {
                name: "Wooden Sword",
                kind: "weapon",
                weaponType: "sword" as WeaponType,
                baseDamage: 5,
                stats: {
                    hp: 0,
                    att: 10,
                    mAtt: 0,
                    def: 0,
                    mDef: 0,
                    speed: 0
                } as StatsModifierType,
                elementalStats: {
                    fire: 0,
                    water: 0,
                    thunder: 0
                } as ElementalStatsModifierType
            },
            {
                name: "Wooden Dagger",
                kind: "weapon",
                weaponType: "dagger" as WeaponType,
                baseDamage: 3,
                stats: {
                    hp: 0,
                    att: 7,
                    mAtt: 0,
                    def: 0,
                    mDef: 0,
                    speed: 2
                } as StatsModifierType,
                elementalStats: {
                    fire: 0,
                    water: 0,
                    thunder: 0
                } as ElementalStatsModifierType
            }
        ] as IWeapon[],
        headGear: [
            {
                name: "Cloth Hat",
                kind: "headGear",
                stats: {
                    hp: 5,
                    att: 0,
                    mAtt: 5,
                    def: 2,
                    mDef: 3,
                    speed: 0
                } as StatsModifierType,
                elementalStats: {
                    fire: 0,
                    water: 0,
                    thunder: 0
                } as ElementalStatsModifierType
            }
        ] as IHeadGear[],
        bodyGear: [
            {
                name: "Cloth Robe",
                kind: "bodyGear",
                stats: {
                    hp: 10,
                    att: 0,
                    mAtt: 5,
                    def: 5,
                    mDef: 5,
                    speed: -1
                } as StatsModifierType,
                elementalStats: {
                    fire: 0,
                    water: 0,
                    thunder: 0
                } as ElementalStatsModifierType
            }
        ] as IBodyGear[],
        legGear: [
            {
                name: "Cloth Pants",
                kind: "legGear",
                stats: {
                    hp: 8,
                    att: 0,
                    mAtt: 5,
                    def: 4,
                    mDef: 4,
                    speed: 0
                } as StatsModifierType,
                elementalStats: {
                    fire: 0,
                    water: 0,
                    thunder: 0
                } as ElementalStatsModifierType
            }
        ] as ILegGear[]
    }
} 