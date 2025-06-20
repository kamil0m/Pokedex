import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonsList() {
    const [pokemons, setPokemons] = useState(undefined);
    const [selectedPokemon, setSelectedPokemon] = useState(undefined);
    const [error, setError] = useState(null);
    const [catched, setCatched] = useState(() => {
        // Initialize from localStorage
        const saved = localStorage.getItem("catchedPokemons");
        console.log(saved);
        console.log(JSON.parse(saved));
        return saved ? JSON.parse(saved) : [];
    });
    
    useEffect(() => {
        // Fetch the list of Pokemons from the PokeAPI
        fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
        .then((response) => response.json())
        .then((data) => setPokemons(data))
        .catch((error) => {
            setError(error);
            console.error("Error fetching Pokemons list:", error);
        });;
    }, []);

    useEffect(() => {
        // When pokemon is catched update the list of catched pokemons in the localStorage
        localStorage.setItem("catchedPokemons", JSON.stringify(catched));
    }, [catched]);
    
    const pokemonImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    function showPokemon(index) {
        // Fetch the details of the selected Pokemon and update its state which will trigger the PokemonCard component to re-render with the new data
        fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
        .then((response) => response.json())
        .then((data) => {
            setSelectedPokemon(data);
        })
        .catch((error) => {
            setError(error)
            console.error("Error fetching Pokemon details:", error)
        });
    }

    function isCatched(pokemon) {
        // Check if the pokemon is saved in localStorage
        return catched.includes(pokemon.name);
    }

    function handleCatchChange(pokemon) {
        // Add or remove the pokemon from local storage
        if (isCatched(pokemon)) {
            setCatched(catched.filter(name => name !== pokemon.name));
        } else {
            setCatched([...catched, pokemon.name]);
        }
    }

// className=""

  return (
    
    <div className="flex flex-col items-center content-center w-[100vw] h-[100%] bg-white" >
        <header className="" 
        // style={{
        //     textAlign: "center",
        //     padding: "20px",
        //     borderRadius: "10px",
        //     marginBottom: "20px"
        // }}
        >
            <h1>PokeDEX</h1>
            <h2>Gotta Catch 'Em All</h2>
        </header>

        <div style={{
            display: "flex",
            flexDirection: "row"
            }}
        >
            <div>
                {pokemons && pokemons.results && (
                    <div>
                        <div>Click on the pokemon name to see more details</div>
                        <div>Check the checkbox to mark it as catched</div>
                        <ul >
                            {pokemons.results.map((pokemon, index) => (
                                <li key={pokemon.name} style={{ 
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                    <span>{pokemon.name}</span>
                                    <img src={`${pokemonImageUrl}${index+1}.png`} alt={pokemon.name} onClick={() => showPokemon(index+1)} />
                                    <input
                                        type="checkbox"
                                        checked={isCatched(pokemon)}
                                        onChange={() => handleCatchChange(pokemon)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {selectedPokemon && <PokemonCard selectedPokemon={selectedPokemon} />}
        </div>
    </div>
  );
}
