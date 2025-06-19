import { useState, useEffect } from "react";

export default function PokemonsList() {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  //   console.log(data.results);
  //    https://pokeapi.co/api/v2/pokemon/ditto

  return (
    <div>
      <p>Pokemons' list :</p>
      {data && data.results && (
        <ul>
          {data.results.map((pokemon, index) => (
            <div key={index}>
              <li>{pokemon.name}</li>
              <img href={pokemon.url} alt={pokemon.name} />
              <button>Show more details</button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
