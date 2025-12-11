import type { CharacterClassType, CharacterType, ElementalStatsModifierType, ElementalStatsType, EquipmentType, SkillType, StatsModifierType, StatsType } from "@shared/types.js";
import { Equipment } from "./Equipment.js";
import { ElementalStats, Stats } from "./Stats.js";

export class Character implements CharacterType {
    id: string | null;
    name: string;
    characterClass: CharacterClassType;
    stats: Stats;
    elementalStats: ElementalStats;
    equipment: EquipmentType;
    wins: number;
    losses: number;

    constructor(data: { name: string; characterClass: CharacterClassType; }) {
        this.id = null;
        this.name = data.name;
        this.characterClass = data.characterClass;
        this.stats = new Stats();
        this.elementalStats = new ElementalStats();
        this.equipment = new Equipment();
        this.wins = 0;
        this.losses = 0;
    }

    calculateTotalStats(): void {
        const totalModifier: Partial<StatsModifierType> = this.characterClass.modifier;

        const slots: (keyof EquipmentType)[] = ['weapon', 'headGear', 'bodyGear', 'legGear'];

        for(const slot of slots) {
            const item = this.equipment[slot];
            if(!item) continue;
            totalModifier.hp = (totalModifier.hp || 0) + (item.stats.hp || 0);
            totalModifier.att = (totalModifier.att || 0) + (item.stats.att || 0);
            if(item.kind === 'weapon') {
                totalModifier.att = (totalModifier.att || 0) + item.baseDamage;
            }
            totalModifier.mAtt = (totalModifier.mAtt || 0) + (item.stats.mAtt || 0);
            totalModifier.def = (totalModifier.def || 0) + (item.stats.def || 0);
            totalModifier.mDef = (totalModifier.mDef || 0) + (item.stats.mDef || 0);
            totalModifier.speed = (totalModifier.speed || 0) + (item.stats.speed || 0);
        }

        this.stats.applyModifier(totalModifier);
    }

    calculateTotalElem(): void {
        
        const totalElemModifier: ElementalStatsModifierType = { fire: 0, water: 0, thunder: 0 };

        const slots: (keyof EquipmentType)[] = ['weapon', 'headGear', 'bodyGear', 'legGear'];

        for(const slot of slots) {
            const item = this.equipment[slot];
            if(!item) continue;
            totalElemModifier.fire += item.elementalStats.fire;
            totalElemModifier.water += item.elementalStats.water;
            totalElemModifier.thunder += item.elementalStats.thunder;
        }

        this.elementalStats.applyModifier(totalElemModifier);
    }
}