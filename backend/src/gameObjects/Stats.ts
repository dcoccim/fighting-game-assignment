import type { ElementalStatsModifierType, ElementalStatsType, StatsModifierType, StatsType } from "../types/types.js";

export class Stats implements StatsType {
    hp: number;
    att: number;
    mAtt: number;
    def: number;
    mDef: number;
    speed: number;

    constructor(data: StatsType) {
        this.hp = data.hp;
        this.att = data.att;
        this.mAtt = data.mAtt;
        this.def = data.def;
        this.mDef = data.mDef;
        this.speed = data.speed;
    }

    applyModifier(modifier: Partial<StatsModifierType>): void {
        if(modifier.hp !== undefined) this.hp += modifier.hp;
        if(modifier.att !== undefined) this.att += modifier.att;
        if(modifier.mAtt !== undefined) this.mAtt += modifier.mAtt;
        if(modifier.def !== undefined) this.def += modifier.def;
        if(modifier.mDef !== undefined) this.mDef += modifier.mDef;
        if(modifier.speed !== undefined) this.speed += modifier.speed;
    }
}

export class ElementalStats implements ElementalStatsType {
    fire: number;
    water: number;
    thunder: number;

    constructor(data: ElementalStatsType) {
        this.fire = data.fire;
        this.water = data.water;
        this.thunder = data.thunder;
    }

    applyModifier(modifier: Partial<ElementalStatsModifierType>): void {
        if(modifier.fire !== undefined) this.fire += modifier.fire;
        if(modifier.water !== undefined) this.water += modifier.water;
        if(modifier.thunder !== undefined) this.thunder += modifier.thunder;
    }
}