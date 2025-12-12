import type { EquipmentListProps } from "./equipmentList.types";
import { EquipmentSlot } from "./EquipmentSlot/EquipmentSlot";
import { useEquipmentList } from "./equipmentList.hooks";
import { handleEquipSubmit, handleOptionChange } from "./equipmentList.functions";

export function EquipmentList({ characterId, characterEquipmentList, onCharacterUpdate, equippableList }: EquipmentListProps) {

    const {
        equipmentList,
        setEquipmentList,
        isEditing, 
        toggleEditing, 
        error, 
        setError 
    } = useEquipmentList(characterEquipmentList);


    return (
         <div className="character-equipment">
                        <h4>Equipment:</h4>
                        <button onClick={() => handleEquipSubmit(
                            characterId,
                            equipmentList,
                            isEditing, 
                            toggleEditing, 
                            onCharacterUpdate, 
                            setError
                        )}>{isEditing ? 'Done' : 'Change'}</button>
                        <ul className="character-card-list">
                            <EquipmentSlot 
                                slotType={{ value: 'weapon', label: 'Weapon' }}
                                selectedItem={equipmentList.weapon}
                                itemList={equippableList.weapon ?? []} 
                                isEditing={isEditing}
                                onChange={(e) => handleOptionChange(e, equipmentList, equippableList, setEquipmentList)}
                            />
                            <EquipmentSlot 
                                slotType={{ value: 'headGear', label: 'Head' }}
                                selectedItem={equipmentList.headGear}
                                itemList={equippableList.headGear ?? []} 
                                isEditing={isEditing}
                                onChange={(e) => handleOptionChange(e, equipmentList, equippableList, setEquipmentList)}
                            />
                            <EquipmentSlot 
                                slotType={{ value: 'bodyGear', label: 'Body' }} 
                                selectedItem={equipmentList.bodyGear}
                                itemList={equippableList.bodyGear ?? []} 
                                isEditing={isEditing}
                                onChange={(e) => handleOptionChange(e, equipmentList, equippableList, setEquipmentList)}
                            />
                            <EquipmentSlot 
                                slotType={{ value: 'legGear', label: 'Legs' }}
                                selectedItem={equipmentList.legGear}
                                itemList={equippableList.legGear ?? []} 
                                isEditing={isEditing}
                                onChange={(e) => handleOptionChange(e, equipmentList, equippableList, setEquipmentList)}
                            />
                            { error && <span style={{ color: 'red' }}> {error.message} </span> }
                        </ul>
                    </div>
    )
}