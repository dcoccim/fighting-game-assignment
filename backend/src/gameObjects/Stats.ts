import type { ElementalStatsModifierType, ElementalStatsType, StatsModifierType, StatsType } from "@shared/types.js";

export class Stats implements StatsType {
    hp: number;
    att: number;
    mAtt: number;
    def: number;
    mDef: number;
    speed: number;

    constructor() {
        this.hp = 100;
        this.att = 10;
        this.mAtt = 10;
        this.def = 10;
        this.mDef = 10;
        this.speed = 10;
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

    constructor() {
        this.fire = 0;
        this.water = 0;
        this.thunder = 0;
    }

    applyModifier(modifier: Partial<ElementalStatsModifierType>): void {
        if(modifier.fire !== undefined) this.fire += modifier.fire;
        if(modifier.water !== undefined) this.water += modifier.water;
        if(modifier.thunder !== undefined) this.thunder += modifier.thunder;
    }
}