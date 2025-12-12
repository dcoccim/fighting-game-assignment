import type { IBodyGear, EquipmentType, EquippableType, IHeadGear, ILegGear, IWeapon } from "@shared/types.js";

export class Equipment implements EquipmentType {
    weapon: IWeapon | null;
    headGear: IHeadGear | null;
    bodyGear: IBodyGear | null;
    legGear: ILegGear | null;

    constructor(equipmentData?: EquipmentType) {
        this.weapon = equipmentData?.weapon ?? null;
        this.headGear = equipmentData?.headGear ?? null;
        this.bodyGear = equipmentData?.bodyGear ?? null;
        this.legGear = equipmentData?.legGear ?? null;
    }

    addToSlot(slot: keyof EquipmentType, item: EquippableType): void {
        this[slot] = item as any;
    }
}