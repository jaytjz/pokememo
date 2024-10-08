import { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import "../styles/Card.css"
import cardBg from "../assets/card-bg.jpeg"

export default function Card({ flipped, id, onClick }){
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
  
    if (loading) return <p>Loading...</p>;
    if (!pokemon) return <p>No Pokémon data available.</p>;
  
    return (
        <Tilt tiltReverse>
        <div className='card-container'>
          <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
            <div className='card-side card-front'>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className='h-52'/>
              <h1 className='text-xl'>{pokemon.name.toUpperCase()}</h1>
            </div>
            <div className='card-side card-back'>
              <img src={cardBg} className='rounded-xl'/>
            </div>
          </div>
        </div>
      </Tilt>
    );
}