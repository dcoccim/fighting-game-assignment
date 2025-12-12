export type EquippableResponseDTO = {
    id: string | null;
    name: string;
    kind: string;
};

export type WeaponResponseDTO = EquippableResponseDTO & {
    weaponType: string;
    baseDamage: number;
};

export type EquippableListResponseDTO = {
    weapon: WeaponResponseDTO[];
    headGear: EquippableResponseDTO[];
    bodyGear: EquippableResponseDTO[];
    legGear: EquippableResponseDTO[];
}