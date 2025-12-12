export function handleBattleSubmit(character1Id: string, character2Id: string) {
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
        return response.text();
    }).then(data => {
        console.log("Battle result:", data);
        return data;
    }).catch(error => {
        console.error("Error during battle request:", error);
        throw error;
    });
}