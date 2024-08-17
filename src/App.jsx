import { useState } from "react"
import Card from "./Components/Card"

function App() {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(prevFlipped => !prevFlipped);
  };

  return (
    <div className="font-pixelifySans text-2xl bg-[url('./src/assets/pokemon-bg.png')] bg-cover bg-center h-screen w-full flex flex-wrap justify-center items-center gap-10">
      <Card setPokemonArray={setPokemonArray} flipped={flipped} onClick={handleCardClick}/>
      <Card setPokemonArray={setPokemonArray} flipped={flipped} onClick={handleCardClick}/>
      <Card setPokemonArray={setPokemonArray} flipped={flipped} onClick={handleCardClick}/>
      {console.log(pokemonArray)}
    </div>
  )
}
export default App
