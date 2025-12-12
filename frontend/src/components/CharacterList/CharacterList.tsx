import { useState } from "react";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import "./characterList.css";
import type { CharacterListProps } from "./characterList.types";
import { handleCharacterSelect, handleCharacterUpdate } from "./characterList.functions";
import type { CharacterType } from "../../../../shared/types";

export function CharacterList({ characterList, setCharacterList, equippableList, selectedChars, setSelectedChars }: CharacterListProps) {

    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <div>
            <h3>Character List</h3>
            <ul className="character-list">
                {characterList.length > 0 ? characterList.map((character) => (
                    <li key={character.id}>
                        
                        <CharacterCard 
                            character={character}
                            equippableList={equippableList}
                            expanded={expandedId === character.id}
                            onCharacterUpdate={(updatedCharacter: CharacterType) => handleCharacterUpdate(characterList, setCharacterList, updatedCharacter)}
                            onExpandToggle={() => setExpandedId(expandedId === character.id ? null : character.id ?? null)} 
                            selected={selectedChars.character1?.id === character.id || selectedChars.character2?.id === character.id}
                            onSelect={() => handleCharacterSelect(selectedChars, setSelectedChars, character)}
                        />
                    </li>
                )) : <li>No characters available.</li>}
            </ul>
            
        </div>
    )
}