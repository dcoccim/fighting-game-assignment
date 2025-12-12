import type { CharacterType } from "../../../../shared/types";

export function handleBattleSubmit(
    character1Id: string, 
    character2Id: string, 
    setCharacterList: React.Dispatch<React.SetStateAction<CharacterType[]>>,
    setBattleLog: (log: string[] | null) => void,
    setSelectedChars: React.Dispatch<React.SetStateAction<{
        character1: CharacterType | null;
        character2: CharacterType | null;
    }>>
) {
    return fetch(`http://localhost:3000/api/characters/battle`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ character1Id, character2Id }),
    }).then(response => {
        if (!response.ok) {
            throw new Error("Battle request failed");
        }
        return response.json();
    }).then(data => {
        setBattleLog(data.log ?? null);
        setCharacterList((prevChars: CharacterType[]) => {
            return prevChars.map((char: CharacterType): CharacterType => {
            if (char.id === data.winner.id) {
                return data.winner as CharacterType;
            } else if (char.id === data.loser.id) {
                return data.loser as CharacterType;
            } else {
                return char;
            }
            });
        });
        setSelectedChars({ character1: null, character2: null });
      return data;
    }).catch(error => {
        console.error("Error during battle request:", error);
        throw error;
    });
}