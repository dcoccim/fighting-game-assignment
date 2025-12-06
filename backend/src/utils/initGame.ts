import { addCharacter } from "../repository/Character.repository.js";
import { addCharacterClass } from "../repository/CharacterClass.repository.js";
import { addEquippable } from "../repository/Equippable.repository.js";
import type { CharacterClassType, CharacterType, EquippableType, SkillType, Weapon, WeaponType } from "../types/types.js";

export async function initGame(): Promise<void> {
    const mageClass: CharacterClassType = {
        id: null as any,
        name: "Mage",
        baseStats: {
            hp: 80,
            att: 30,
            mAtt: 70,
            def: 20,
            mDef: 50,
            speed: 40
        },
        preferredWeapon: "staff",
        skills: [{
            name: "Fire",
            baseDamage: 40,
            elementalType: "fire"
        }, {
            name: "Blizzard",
            baseDamage: 35,
            elementalType: "water"
        }, {
            name: "Thunder",
            baseDamage: 45,
            elementalType: "thunder"
        }]
    };

    const startingWeapon: Weapon = {
        id: null as any,
        name: "Wooden Staff",
        kind: "weapon",
        weaponType: "staff",
        baseDamage: 1,
        stats: {
            hp: 0,
            att: 5,
            mAtt: 10,
            def: 0,
            mDef: 0,
            speed: 0
        },
        elementalStats: {
            fire: 0.1,
            water: 0.1,
            thunder: 0.1
        }
    };

    
    const addedWeapon = (await addEquippable(startingWeapon)) as Weapon;
    console.log("Added equippable:", addedWeapon);
    const addedClass = await addCharacterClass(mageClass);
    console.log("Added class:", addedClass);
    const firstCharacter: CharacterType = {
        id: "char_001",
        name: "Gandalf",
        characterClass: addedClass,
        wins: 0,
        losses: 0,
        elementalStats: {
            fire: 0,
            water: 0,
            thunder: 0
        },
        equipment: {
            weapon: addedWeapon,
            headGear: null,
            bodyGear: null,
            legGear: null
        }
    };
    const addedCharacter = await addCharacter(firstCharacter);
    console.log("Added character:", addedCharacter);
    console.log("Game initialized");
}