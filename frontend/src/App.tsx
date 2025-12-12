import './App.css'
import { useApp } from './App.hooks';
import { Arena } from './components/Arena/Arena';
import { CharacterForm } from './components/CharacterForm/CharacterForm';
import { CharacterList } from './components/CharacterList/CharacterList';

function App() {
  
  const { 
    characterList, 
    setCharacterList, 
    equippableList,
    selectedChars,
    setSelectedChars 
  } = useApp();

  const { character1, character2 } = selectedChars;

  return (
    <>    
      <Arena 
        character1={character1} 
        character2={character2} 
        setCharacterList={setCharacterList} 
        setSelectedChars={setSelectedChars}
      />
      <CharacterForm onCharacterAdded={char => setCharacterList([...characterList, char])} />
      <CharacterList 
        characterList={characterList} 
        setCharacterList={setCharacterList} 
        equippableList={equippableList}
        selectedChars={selectedChars}
        setSelectedChars={setSelectedChars}
      />
    </>
  )
}

export default App
