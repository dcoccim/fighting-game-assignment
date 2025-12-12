import type { ElementalStatsListProps } from "./elementalStats.types";

export function ElementalStatsList({ elementalStats }: ElementalStatsListProps) {

    return (
        <div className="character-elemental-stats">
            <h4>Elemental Stats:</h4>
            <ul className="character-card-list">
                <li>Fire: {elementalStats.fire}</li>
                <li>Water: {elementalStats.water}</li>
                <li>Thunder: {elementalStats.thunder}</li>
            </ul>
        </div>
    );
}