import { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import "../styles/Card.css"

export default function Card({ setPokemonArray, flipped, id, onClick }){
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
     
    const fetchRandomPokemon = async () => {

      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchRandomPokemon();
    }, []); // Empty dependency array ensures it runs once on mount

    useEffect(() => {
        if (pokemon) {
            setPokemonArray(prevArray => {
                if (!prevArray.includes(pokemon.name)) {
                    return [...prevArray, pokemon.name];
                }
                return prevArray;
            });
        }
     }, [pokemon]);
  
    if (loading) return <p>Loading...</p>;
    if (!pokemon) return <p>No Pokémon data available.</p>;
  
    return (
        <Tilt tiltReverse>
        <div className='card-container'>
          <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
            <div className='card-side card-front'>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className='h-60'/>
              <h1 className='text-xl'>{pokemon.name.toUpperCase()}</h1>
            </div>
            <div className='card-side card-back'>
              <img src="./src/assets/card-bg.jpeg" className='rounded-xl'/>
            </div>
          </div>
        </div>
      </Tilt>
    );
}