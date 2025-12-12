import type { ArenaType, CharacterType, ElementalStatsType, Fighter, SkillType } from "@shared/types.js";
import type { Character } from "./Character.js";

export class Arena<T extends Fighter = Character> implements ArenaType {
    
    currentAttacking: T;
    currentDefending: T;
    battleLog: string[] = [];
    turn: number = 0;

    constructor(character1: T, character2: T) {
        if (character1.stats.speed >= character2.stats.speed) {
            this.currentAttacking = character1;
            this.currentDefending = character2;
        } else {
            this.currentAttacking = character2;
            this.currentDefending = character1;
        }
        this.battleLog = [];
    }

    startBattle(): T {
        this.turn = 1;
        this.battleLog.push(`Battle Start! ${this.currentAttacking.name} vs ${this.currentDefending.name}`);
        while (!this.checkWin()) {
            this.executeAction();
            this.nextTurn();
        }
        return this.currentAttacking;
    }

    nextTurn(): void {
        this.turn += 1;
        const temp = this.currentAttacking;
        this.currentAttacking = this.currentDefending;
        this.currentDefending = temp;
    }

    checkWin(): boolean {
        if (this.currentDefending.stats.hp <= 0) {
            this.battleLog.push(`${this.currentAttacking.name} wins the battle!`);
            return true;
        }
        return false;
    }

    calculateDamage(skill?: SkillType): number {
        let damage: number = skill?.baseDamage || 0;
        if(skill?.isMagic) {
            damage += this.currentAttacking.stats.mAtt;
            const skillElement = skill.elementalType as keyof ElementalStatsType;
            const elementalDiff = this.currentAttacking.elementalStats[skillElement] - this.currentDefending.elementalStats[skillElement];
            if(elementalDiff > 0) {
                damage += Math.floor(damage * 0.1 * elementalDiff);
            } else if(elementalDiff < 0) {
                damage -= Math.floor(damage * 0.1 * Math.abs(elementalDiff));
            }
            damage -= this.currentDefending.stats.mDef;
        } else {
            damage += this.currentAttacking.stats.att;
            damage -= this.currentDefending.stats.def;
        }
        if(damage < 0) damage = 0;
        return damage;
    }

    executeAction(): void {
        const skill = this.currentAttacking.selectSkill(this.currentDefending);
        const damage = this.calculateDamage(skill);
        this.currentDefending.applyDamage(damage);
        this.battleLog.push(this.logTurn(skill.name, damage));
    }

    logTurn(skillName: string, damage: number): string {
        return `Turn ${this.turn}: ${this.currentAttacking.name} used ${skillName} and dealt ${damage} damage to ${this.currentDefending.name}. ${this.currentDefending.name} has ${this.currentDefending.stats.hp} HP left.`;
    }

}