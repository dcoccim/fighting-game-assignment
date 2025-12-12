import type { CharacterType } from "../../../../shared/types";
import { handleSubmit } from "./characterForm.functions";
import { useCharacterForm } from "./characterForm.hooks";

interface CharacterFormProps {
  onCharacterAdded?: (char: CharacterType) => void;
}

export function CharacterForm({ onCharacterAdded }: CharacterFormProps) {

  const { 
    classList,
    formData,
    setFormData
  } = useCharacterForm();
  
  return (
  <div>
    <h3>Create New Character</h3>
    <label htmlFor="characterName">Name:</label>
    <input 
      type="text" 
      id="characterName" 
      name="characterName" 
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
    <label htmlFor="characterClass">Class:</label>
    <select 
      id="characterClass" 
      name="characterClass" 
      value={formData.characterClassId}
      onChange={(e) => setFormData({ ...formData, characterClassId: e.target.value })}
      disabled={!classList || classList.length === 0}
      >
      <option value="" disabled>Select a class</option>
      {classList.map((charClass) => (
        <option key={charClass.id || ''} value={charClass.id || ''}>
          {charClass.name}
        </option>
      ))}
    </select>
    <button 
      type="submit" 
      onClick={() => handleSubmit(formData, setFormData, onCharacterAdded)} 
      disabled={!formData.name || !formData.characterClassId}
      >
        Create Character
    </button>
  </div>);
}