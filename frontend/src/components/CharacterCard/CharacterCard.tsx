import type { CharacterCardProps } from "./characterCard.types";
import "./characterCard.css";
import { EquipmentList } from "./EquipmentList/EquipmentList";
import { ElementalStatsList } from "./ElementalStatsList/ElementalStatsList";
import { StatsList } from "./StatsList/StatsList";

export function CharacterCard({ character, expanded, equippableList, onCharacterUpdate, onToggle }: CharacterCardProps) {

    return (
        <div className="character-card">
            <div className="character-card-header" onClick={onToggle}>
                <h3>{character.name}</h3>
                <p>{character.characterClass.name}</p>
            </div>
            {expanded && (
                <div className="character-details">
                   <EquipmentList
                        characterId={character.id!}
                        characterEquipmentList={character.equipment}
                        equippableList={equippableList}
                        onCharacterUpdate={onCharacterUpdate}
                    />
                    <ElementalStatsList elementalStats={character.elementalStats} />
                    <StatsList stats={character.stats} />
                </div>
            )}
        </div>
    );
}