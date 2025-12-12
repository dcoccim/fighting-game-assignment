import type { CharacterType } from "../../../../shared/types";

export type CharacterFormType = {
    name: string;
    characterClassId: string;
}
    
export type CharacterFormProps = {
  onCharacterAdded?: (char: CharacterType) => void;
}