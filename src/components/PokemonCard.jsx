import React, { useState, useEffect } from "react";

export default function PokemonCard({selectedPokemon}) {
    const [pokemon, setPokemon] = useState(selectedPokemon);
    
    useEffect(() => {
        setPokemon(selectedPokemon);
    },[selectedPokemon]);

  return (
    <div className="h-full">
        {pokemon && (
            <div className="flex flex-col h-full" >
                <h2 className="text-3xl">{pokemon.name}</h2>
                <div className="flex flex-row align-center h-full">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <div className="flex flex-col">
                        <p>Height: {pokemon.height}</p>
                        <p>Weight: {pokemon.weight}</p>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}
