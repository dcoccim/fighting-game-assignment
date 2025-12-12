import type { CharacterType } from "../../../../shared/types";
import type { EquippableListType } from "../../app.types";

export interface CharacterCardProps {
    character: CharacterType;
    expanded: boolean;
    equippableList: EquippableListType;
    selected: boolean;
    onCharacterUpdate: (updatedCharacter: CharacterType) => void;
    onSelect: (selected: boolean) => void;
    onExpandToggle: () => void;
}