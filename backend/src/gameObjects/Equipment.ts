import type { IBodyGear, EquipmentType, EquippableType, IHeadGear, ILegGear, IWeapon } from "@shared/types.js";

export class Equipment implements EquipmentType {
    weapon: IWeapon | null;
    headGear: IHeadGear | null;
    bodyGear: IBodyGear | null;
    legGear: ILegGear | null;

    constructor() {
        this.weapon = null;
        this.headGear = null;
        this.bodyGear = null;
        this.legGear = null;
    }

    addItem(item: EquippableType): void {
        switch(item.kind) {
            case 'weapon':
                this.weapon = item as IWeapon;
                break;
            case 'headGear':
                this.headGear = item as IHeadGear;
                break;
            case 'bodyGear':
                this.bodyGear = item as IBodyGear;
                break;
            case 'legGear':
                this.legGear = item as ILegGear;
                break;
        }
    }
}