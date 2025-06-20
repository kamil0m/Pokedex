import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PokemonCard({selectedPokemon}) {
    const [pokemon, setPokemon] = useState(selectedPokemon);
    
    useEffect(() => {
        setPokemon(selectedPokemon);
    },[selectedPokemon]);

    // async function fetchTypeImage(typeUrl) {
    //     // Fetch the type image from the provided URL
    //     const imageUrl = await axios.get(typeUrl)
    //         .then(response => return response.data.sprites['generation-iii']['firered-leafgreen'].name_icon)
    //         .catch(error => {
    //             console.error("Error fetching type image:", error);
    //             return "";
    //         });
    //     return imageUrl;
    // }

  return (
    <div className="h-full">
        {pokemon && (
            <div className="flex flex-col h-full" >
                <h2 className="text-3xl">{pokemon.name}</h2>
                <div className="flex flex-row align-center h-full">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    {/* {pokemon.types.map((type) => {
                        <img 
                            key={type.type.name} 
                            src={fetchTypeImage(type.type.url)} 
                            alt={type.type.name} 
                            className="h-8 w-8"
                        />
                        
                    })} */}
                    <div className="flex flex-col">
                        <p>Height: {pokemon.height}</p>
                        <p>Weight: {pokemon.weight}</p>
                        {pokemon.stats.map((stat, index) => (
                            <p key={index}>{stat.stat.name}: {stat.base_stat}</p>
                        ))}
                        <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}
