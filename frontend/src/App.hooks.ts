import { useEffect, useState } from "react";
import type { CharacterType } from "../../shared/types";

export function useApp() {

    const [characterList, setCharacterList] = useState<CharacterType[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/characters')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCharacterList(data);
            })
            .catch(error => console.error('Error fetching characters:', error));
    }, []);

    return {
        characterList,
        setCharacterList
    };
}