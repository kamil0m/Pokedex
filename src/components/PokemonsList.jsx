import { useState, useEffect, use } from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonsList() {
    const [data, setData] = useState(undefined);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [error, setError] = useState(null);

    const pokemonImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        .then((response) => response.json())
        .then((data) => setData(data));
    }, []);

// Test if selectedPokemon state updates:
//   useEffect(() => {
//     console.log("Selected Pokemon's object in state:", selectedPokemon);
//   }, [selectedPokemon]);
  
    function showPokemon(index) {
        console.log("Selected Pokemon's index:", index);
        // Fetch the details of the selected Pokemon
        fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
        .then((response) => response.json())
        .then((data) => {
            setSelectedPokemon(data);
        })
        .catch((error) => setError(error));
    }

  return (
    <>
        <div>
            <p>Pokemons' list :</p>
            {data && data.results && (
                <div>
                    <ul>
                        {data.results.map((pokemon, index) => (
                            <li key={index} style={{ 
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <span>{pokemon.name}</span>
                                <img src={`${pokemonImageUrl}${index+1}.png`} alt={pokemon.name} />
                                <button onClick={() => showPokemon(index+1)}>Show more details</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        {selectedPokemon && <PokemonCard selectedPokemon={selectedPokemon} />}
    </>
  );
}
