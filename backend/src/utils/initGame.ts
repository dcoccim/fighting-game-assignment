import characterClassService from "../service/characterClass.service.js";
import equippableService from "../service/equippable.service.js";
import characterService from "../service/character.service.js";
import { seedData } from "./seedData.js";

export async function initGame(): Promise<void> {

    for(const charClass of seedData.classes) {
        console.log("Adding character class:", charClass.name);
        await characterClassService.addCharacterClass(charClass);
    }

    for(const weapon of seedData.equippables.weapons) {
        await equippableService.addEquippable(weapon);
    }

    for(const headGear of seedData.equippables.headGear) {
        await equippableService.addEquippable(headGear);
    }

    for(const bodyGear of seedData.equippables.bodyGear) {
        await equippableService.addEquippable(bodyGear);
    }

    for(const legGear of seedData.equippables.legGear) {
        await equippableService.addEquippable(legGear);
    }

    console.log("Game initialized with seed data.");
}