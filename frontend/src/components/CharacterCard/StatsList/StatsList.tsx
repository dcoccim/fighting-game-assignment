import type { StatsListProps } from "./statsList.types";

export function StatsList( { stats }: StatsListProps) {

    return (
        <div className="character-stats-container">
            <h4>Stats:</h4>
            <ul className="character-card-list">
                <li>HP: {stats.hp}</li>
                <li>Attack: {stats.att}</li>
                <li>Defense: {stats.def}</li>
                <li>Magic Attack: {stats.mAtt}</li>
                <li>Magic Defense: {stats.mDef}</li>
                <li>Speed: {stats.speed}</li>
            </ul>
        </div>
    )
}