import { useEffect, useState } from "react";
import type { CharacterType } from "../../shared/types";
import type { EquippableListType } from "./app.types";

export function useApp() {

    const [characterList, setCharacterList] = useState<CharacterType[]>([]);
    const [equippableList, setEquippableList] = useState<EquippableListType>({
        weapon: [],
        headGear: [],
        bodyGear: [],
        legGear: []
    });

    useEffect(() => {
        fetch('http://localhost:3000/api/characters')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCharacterList(data);
            })
            .catch(error => console.error('Error fetching characters:', error));
        fetch('http://localhost:3000/api/equippables')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setEquippableList(data);
            })
            .catch(error => console.error('Error fetching equippables:', error));
    }, []);

    return {
        characterList,
        setCharacterList,
        equippableList
    };
}