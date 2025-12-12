import type { CharacterType } from "../../../../shared/types";

export type ArenaProps = {
    character1: CharacterType | null;
    character2: CharacterType | null;
    setCharacterList: React.Dispatch<React.SetStateAction<CharacterType[]>>;
    setSelectedChars: React.Dispatch<React.SetStateAction<{
        character1: CharacterType | null;
        character2: CharacterType | null;
    }>>;
}