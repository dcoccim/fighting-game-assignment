import type { CharacterType, EquipmentType, EquippableType } from "../../../../../shared/types";
import type { IncompatibleEquipError } from "./equipmentList.types";

export function handleEquipSubmit(
    characterId: string,
    equipmentList: EquipmentType,
    isEditing: boolean, 
    toggleEditing: () => void, 
    onCharacterUpdate: (updatedCharacter: CharacterType) => void, 
    setError: (value: IncompatibleEquipError) => void
) {
    if (!isEditing) {
        toggleEditing();
    } else {
        fetch(`http://localhost:3000/api/characters/${characterId}/equip`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(equipmentList),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.message || `HTTP error! status: ${response.status}`);
                });
            }
            return response.json();
        })
        .then((updatedCharacter: CharacterType) => {
            onCharacterUpdate(updatedCharacter);
            setError({ message: '' });
            toggleEditing();
        })
        .catch(error => {
            setError({ message: error.message });
        });
    }
}

export function handleOptionChange(
    event: React.ChangeEvent<HTMLSelectElement>, 
    equipmentList: EquipmentType, 
    optionsByKind: { [key: string]: EquippableType[] },
    setEquipmentList: (equipment: EquipmentType) => void
) {
    const { name, value } = event.target;
    const selectedItem = optionsByKind[name].find(item => item.id === value) || null;
    setEquipmentList({
        ...equipmentList,
        [name]: selectedItem
    });
}