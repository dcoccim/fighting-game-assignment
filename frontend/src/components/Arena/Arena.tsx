import { useState } from "react";
import { handleBattleSubmit } from "./arena.functions";
import type { ArenaProps } from "./arena.types";

export function Arena({character1, character2, setCharacterList, setSelectedChars }: ArenaProps) {

    const [battleLog, setBattleLog] = useState<string[] | null>(null);

    return (
        <div>
            <h3>Arena</h3>
            {(!character1 && !character2) ? (
                <p>Select 2 characters</p>
            ) : (!character1 || !character2) ? (
                <p>Select 1 more character</p>
            ) : (
                <div>
                    <p>{character1.name} vs {character2.name}</p>
                    <button onClick={() => handleBattleSubmit(character1.id!, character2.id!, setCharacterList, setBattleLog, setSelectedChars)}>Start Battle</button>
                </div>
            )}
            {battleLog && (
                <div>
                    <h4>Battle Log:</h4>
                    <ul>
                        {battleLog.map((logEntry: string, index: number) => (
                            <li key={index}>{logEntry}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}