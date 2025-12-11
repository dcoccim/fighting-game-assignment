export type CharacterClassResponseDTO = {
    id: string | null;
    name: string;
    preferredWeapon: string;
};

export type CharacterClassListResponseDTO = CharacterClassResponseDTO[];