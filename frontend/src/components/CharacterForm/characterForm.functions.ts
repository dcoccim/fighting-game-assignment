import type { CharacterType } from "../../../../shared/types";
import type { CharacterFormType } from "./characterForm.types";

export const handleSubmit = (
        formData: CharacterFormType, 
        setFormData: (data: CharacterFormType) => void,
        onCharacterAdded?: (char: CharacterType) => void
    ) => {
    console.log('Submitting form data:', formData);
    fetch('http://localhost:3000/api/characters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Character created successfully:', data);
        setFormData({ name: '', characterClassId: '' });
        if (onCharacterAdded) {
            onCharacterAdded(data);
        }
    })
    .catch(error => {
        console.error('Error creating character:', error);
    });
}