import { useState } from "react";
import type { IncompatibleEquipError } from "./equipmentList.types";
import type { EquipmentType } from "../../../../../shared/types";

export const useEquipmentList = (characterEquipmentList: EquipmentType) => {

    const [equipmentList, setEquipmentList] = useState<EquipmentType>(characterEquipmentList);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [error, setError] = useState<IncompatibleEquipError | null>(null);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    return {
        equipmentList,
        setEquipmentList,
        isEditing,
        toggleEditing,
        error,
        setError
    };
}