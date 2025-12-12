import type { CharacterType } from "../../../../shared/types";

export function handleCharacterUpdate(
    characterList: CharacterType[],
    setCharacterList: (characterList: CharacterType[]) => void,
    updatedCharacter: CharacterType
) {
    setCharacterList(characterList.map(c => c.id === updatedCharacter.id ? updatedCharacter : c));
}

export function handleCharacterSelect(
    selectedChars: { character1: CharacterType | null; character2: CharacterType | null },
    setSelectedChars: (selectedChars: { character1: CharacterType | null; character2: CharacterType | null }) => void,
    character: CharacterType
) {
    if (selectedChars.character1?.id === character.id) {
        setSelectedChars({ ...selectedChars, character1: null });
    } else if (selectedChars.character2?.id === character.id) {
        setSelectedChars({ ...selectedChars, character2: null });
    } else if (!selectedChars.character1) {
        setSelectedChars({ ...selectedChars, character1: character });
    } else if (!selectedChars.character2) {
        setSelectedChars({ ...selectedChars, character2: character });
    }
}