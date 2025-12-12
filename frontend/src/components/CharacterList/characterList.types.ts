import type { CharacterType } from "../../../../shared/types";
import type { EquippableListType } from "../../app.types";

export type CharacterListProps = {
    characterList: CharacterType[];
    setCharacterList: (characterList: CharacterType[]) => void;
    equippableList: EquippableListType;
    selectedChars: { character1: CharacterType | null; character2: CharacterType | null };
    setSelectedChars: (selectedChars: { character1: CharacterType | null; character2: CharacterType | null }) => void;
}