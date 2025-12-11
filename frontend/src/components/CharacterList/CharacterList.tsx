import type { CharacterType } from "../../../../shared/types";

export function CharacterList({ characterList }: { characterList: CharacterType[] }) {
    return (
        <div>
            <h3>Character List</h3>
            <ul>
                {characterList.length > 0 ? characterList.map((character) => (
                    <li key={character.id}>
                        {character.name} - Class: {character.characterClass.name}
                    </li>
                )) : <li>No characters available.</li>}
            </ul>
            
        </div>
    )
}