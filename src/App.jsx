import { useState, useEffect } from "react"
import Card from "./Components/Card"

function App() {
  const [flipped, setFlipped] = useState(false);
  const [pokemonIds, setPokemonIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [checkedCards, setCheckedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const getId = () => {
    const maxPokemonId = 649; // Till gen5
    const randomId = Math.floor(Math.random() * maxPokemonId) + 1;

    return randomId;
  }

  const generateUniqueIds = (count) => {
    const uniqueIds = new Set();

    while (uniqueIds.size < count) {
      uniqueIds.add(getId());
    }

    return Array.from(uniqueIds);
  };

  useEffect(() => {
    const ids = generateUniqueIds(14);
    setPokemonIds(ids);
  }, []);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleCardClick = (id) => {
    if (gameOver) return;

    setCheckedCards(prevCheckedCards => {
      if(prevCheckedCards.includes(id)){
        setGameOver(true);
        if(score > bestScore){
          setBestScore(score);
        }
        return prevCheckedCards;
      }

      const newCheckedCards = [...prevCheckedCards, id];
      setScore(prevScore => prevScore + 1)

      if (newCheckedCards.length === pokemonIds.length) {
        setWin(true);
        setBestScore(pokemonIds.length);
      }

      return newCheckedCards;
    });

    setFlipped(prevFlipped => !prevFlipped);
    setTimeout(() => {
      setPokemonIds(prevIds => shuffleArray(prevIds));
      setTimeout(() => {
        setFlipped(prevFlipped => !prevFlipped);
      }, 400);
    }, 400);
  };

  const handleRestart = () => {
    const ids = generateUniqueIds(14);
    setPokemonIds(ids);
    setCheckedCards([]);
    setScore(0);
    setGameOver(false);
    setWin(false);
  };

  return (
    <div className="font-pixelifySans text-2xl bg-[url('./src/assets/pokemon-bg.png')] bg-cover bg-center h-screen w-full ">
      <div className="flex justify-center">
        <h1 className="p-10">Best Score: {bestScore}</h1>
        <h1 className="p-10">Score: {score}/ {pokemonIds.length}</h1>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {!gameOver && !win && (
          pokemonIds.map(id => (
            <Card key={id} flipped={flipped} id={id} onClick={() => handleCardClick(id)}/>
          ))
        )
        }
      </div>
      {gameOver && (
        <div className="text-center mt-10">
          <h2 className="text-3xl">Game Over!</h2>
          <button 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded" 
            onClick={handleRestart}
          >
            Restart Game
          </button>
        </div>
      )}
      {win && (
        <div className="text-center mt-10">
        <h2 className="text-3xl">You Win!</h2>
        <button 
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded" 
          onClick={handleRestart}
        >
          Replay
        </button>
      </div>
      )}
    </div>
  )
}
export default App
