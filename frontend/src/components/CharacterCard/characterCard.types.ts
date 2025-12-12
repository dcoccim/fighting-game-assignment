import type { CharacterType } from "../../../../shared/types";
import type { EquippableListType } from "../../app.types";

export interface CharacterCardProps {
    character: CharacterType;
    expanded: boolean;
    equippableList: EquippableListType;
    onCharacterUpdate: (updatedCharacter: CharacterType) => void;
    onToggle: () => void;
}