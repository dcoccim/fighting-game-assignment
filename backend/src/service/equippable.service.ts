import equippableRepository from "../repository/Equippable.repository.js";
import type { EquippableType } from "@shared/types.js";

async function addEquippable(item: EquippableType): Promise<EquippableType> {
    try{
        console.debug("Adding new equippable item with data:", item);
        const createdItem = await equippableRepository.addEquippable(item);
        console.info(`Added equippable item: ${createdItem.name} (ID: ${createdItem.id})`);
        return createdItem;
    } catch (error) {
        console.error("Error adding equippable item:", error);
        throw error;
    }
}

async function getEquippableById(id: string): Promise<EquippableType | null> {
    try {
        console.debug(`Fetching equippable item with ID: ${id}`);
        const equippable = await equippableRepository.getEquippableById(id);
        if (equippable) {
            console.info(`Fetched equippable item: ${equippable.name} (ID: ${equippable.id})`);
        } else {
            console.warn(`Equippable item with ID: ${id} not found.`);
        }
        return equippable;
    } catch (error) {
        console.error(`Error fetching equippable item with ID: ${id}`, error);
        throw error;
    }
}

export default { addEquippable, getEquippableById };