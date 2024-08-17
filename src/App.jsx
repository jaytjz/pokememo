import { useState, useEffect } from "react"
import Card from "./Components/Card"

function App() {
  const [flipped, setFlipped] = useState(false);
  const [pokemonIds, setPokemonIds] = useState([]);
  const [score, setScore] = useState(0)

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

  const handleCardClick = () => {
    setFlipped(prevFlipped => !prevFlipped);
    setTimeout(() => {
      setPokemonIds(prevIds => shuffleArray(prevIds));
      setTimeout(() => {
        setFlipped(prevFlipped => !prevFlipped);
      }, 400);
    }, 400);
  };

  return (
    <div className="font-pixelifySans text-2xl bg-[url('./src/assets/pokemon-bg.png')] bg-cover bg-center h-screen w-full ">
      <h1 className="text-center p-10">Score: {score}/ {pokemonIds.length}</h1>
      <div className="flex flex-wrap justify-center items-center gap-10">
        {pokemonIds.map(id => (
          <Card key={id} flipped={flipped} id={id} onClick={handleCardClick}/>
        ))}
        {console.log(pokemonIds)}
      </div>
    </div>
  )
}
export default App
