import React, { useState, useEffect } from "react";

export default function PokemonCard({selectedPokemon}) {
    const [pokemon, setPokemon] = useState(selectedPokemon);
    
    useEffect(() => {
        setPokemon(selectedPokemon);
    },[selectedPokemon]);

  return (
    <div style={{
    }}>
        {pokemon && (
            <div style={{
                display: "flex",
                position: "fixed",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxSizing: "border-box"
            }}>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
            </div>
        )}
    </div>
  )
}
