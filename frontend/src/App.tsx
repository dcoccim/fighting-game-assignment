import './App.css'
import { useApp } from './App.hooks';
import { CharacterForm } from './components/CharacterForm/CharacterForm';
import { CharacterList } from './components/CharacterList/CharacterList';

function App() {
  
  const { characterList, setCharacterList } = useApp();

  return (
    <>    
      <CharacterForm onCharacterAdded={char => setCharacterList([...characterList, char])} />
      <CharacterList characterList={characterList} />
    </>
  )
}

export default App
