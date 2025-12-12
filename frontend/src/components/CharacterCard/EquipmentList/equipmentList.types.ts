import type { CharacterType, EquipmentType } from "../../../../../shared/types";
import type { EquippableListType } from "../../../app.types";

export type EquipmentListProps = {
    characterId: string;
    characterEquipmentList: EquipmentType;
    onCharacterUpdate: (updatedCharacter: CharacterType) => void;
    equippableList: EquippableListType;
}

export type IncompatibleEquipError = {
    message: string;
}