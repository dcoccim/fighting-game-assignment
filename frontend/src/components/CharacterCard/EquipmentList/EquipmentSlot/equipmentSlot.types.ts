import type { EquippableType } from "../../../../../../shared/types";

type SlotType = {
    value: 'weapon' | 'headGear' | 'bodyGear' | 'legGear';
    label: 'Weapon' | 'Head' | 'Body' | 'Legs';
}

export type EquipmentSlotProps = {
    slotType: SlotType;
    selectedItem: EquippableType | null;
    itemList: EquippableType[];
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}