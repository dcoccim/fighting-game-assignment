import type { CharacterClassType, CharacterType, ElementalStatsType, EquipmentType, SkillType, StatsType } from "../types/types.js";

export class Character implements CharacterType {
    id: string;
    name: string;
    characterClass: CharacterClassType;
    stats: StatsType;
    elementalStats: ElementalStatsType;
    equipment: EquipmentType;
    wins: number = 0;
    losses: number = 0;

    constructor(data: CharacterType) {
        this.id = data.id;
        this.name = data.name;
        this.characterClass = data.characterClass;
        this.stats = { ...data.characterClass.baseStats };
        this.elementalStats = data.elementalStats;
        this.equipment = data.equipment;
    }

    getTotalStats(): StatsType {
        const totalStats: StatsType = { ...this.characterClass.baseStats };

        const slots: (keyof EquipmentType)[] = ['weapon', 'headGear', 'bodyGear', 'legGear'];

        for(const slot of slots) {
            const item = this.equipment[slot];
            if(!item) continue;
            totalStats.hp += item.stats.hp || 0;
            totalStats.att += item.stats.att || 0;
            if(item.kind === 'weapon') {
                totalStats.att += (item as any).baseDamage || 0;
            }
            totalStats.mAtt += item.stats.mAtt || 0;
            totalStats.def += item.stats.def || 0;
            totalStats.mDef += item.stats.mDef || 0;
            totalStats.speed += item.stats.speed || 0;
        }

        return totalStats;
    }

    getTotalElem(): ElementalStatsType {
        
        const totalElem: ElementalStatsType = this.elementalStats;

        const slots: (keyof EquipmentType)[] = ['weapon', 'headGear', 'bodyGear', 'legGear'];

        for(const slot of slots) {
            const item = this.equipment[slot];
            if(!item) continue;
            totalElem.fire += item.elementalStats.fire || 0;
            totalElem.water += item.elementalStats.water || 0;
            totalElem.thunder += item.elementalStats.thunder || 0;
        }

        return totalElem;
    }
}