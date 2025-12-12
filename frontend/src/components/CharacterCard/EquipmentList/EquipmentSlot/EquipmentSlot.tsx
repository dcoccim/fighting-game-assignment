import type { EquipmentSlotProps } from "./equipmentSlot.types";

export function EquipmentSlot( { slotType, selectedItem, itemList, isEditing, onChange}: EquipmentSlotProps) {
    return (
        <li>
            {slotType.label}: 
            {isEditing ? (
                <>
                    <select onChange={onChange} value={selectedItem?.id || ''} name={slotType.value}>
                        <option value="">None</option>
                        {itemList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </>
            ) : (
                <span>{selectedItem?.name ?? 'None'}</span>
            )}
        </li>
    );
}