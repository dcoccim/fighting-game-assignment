import type { CharacterType } from "../../../../shared/types";
import type { EquippableListType } from "../../app.types";

export type CharacterListProps = {
    characterList: CharacterType[];
    setCharacterList: (characterList: CharacterType[]) => void;
    equippableList: EquippableListType;
}