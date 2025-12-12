import type { CharacterType } from "../../../../shared/types";

export function handleCharacterUpdate(
    characterList: CharacterType[],
    setCharacterList: (characterList: CharacterType[]) => void,
    updatedCharacter: CharacterType
) {
    setCharacterList(characterList.map(c => c.id === updatedCharacter.id ? updatedCharacter : c));
}