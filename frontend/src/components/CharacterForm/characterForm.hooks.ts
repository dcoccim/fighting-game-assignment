import { useEffect, useState } from "react"
import type { CharacterClassType } from "../../../../shared/types";
import type { CharacterFormType } from "./characterForm.types";



export const useCharacterForm = () => {

    const [classList, setClassList] = useState<CharacterClassType[]>([]);

    const [formData, setFormData] = useState<CharacterFormType>({ name: '', characterClassId: '' });

    useEffect(() => {
        fetch('http://localhost:3000/api/classes')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setClassList(data);
            })
            .catch(error => console.error('Error fetching character classes:', error));
    }, [])

    return {
        classList,
        formData,
        setFormData
    }

}