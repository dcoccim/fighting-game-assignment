import type { EquippableType, IWeapon } from "../../shared/types";

export type EquippableListType = {
    weapon: IWeapon[];
    headGear: EquippableType[];
    bodyGear: EquippableType[];
    legGear: EquippableType[];
}