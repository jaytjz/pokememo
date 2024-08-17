import { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

export default function Card(){
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const fetchRandomPokemon = async () => {
      const maxPokemonId = 649; // Till gen5
      const randomId = Math.floor(Math.random() * maxPokemonId) + 1;
  
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
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
  
    if (loading) return <p>Loading...</p>;
    if (!pokemon) return <p>No Pokémon data available.</p>;
  
    return (
      <Tilt
        tiltReverse
      >
          <div className='flex flex-col items-center justify-center rounded-xl bg-black/20 border-0 py-1 h-80 w-56'>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className='h-60'/>
            <h1>{pokemon.name.toUpperCase()}</h1>
          </div>
      </Tilt>
    );
}