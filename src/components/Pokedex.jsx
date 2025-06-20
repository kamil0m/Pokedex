import React, { useState, useEffect } from 'react'
import PokemonCard from "./PokemonCard"
import logo from "../assets/logo.png"
import axios from 'axios';

export default function Pokedex() {
    const [pokemons, setPokemons] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(undefined);
    const [catched, setCatched] = useState(() => {
        // Initialize from localStorage
        const saved = localStorage.getItem("catchedPokemons");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        // Fetch the list of Pokemons from the PokeAPI
        setLoading(true);
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0")
            .then((response) => {
                setPokemons(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Pokemons list:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // When pokemon is catched update the list of catched pokemons in the localStorage
        localStorage.setItem("catchedPokemons", JSON.stringify(catched));
    }, [catched]);
    
    const pokemonImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    function showPokemon(index) {
        // Fetch the details of the selected Pokemon and update its state which will trigger the PokemonCard component to re-render with the new data
        axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`)
        .then((response) => {
           setSelectedPokemon(response.data);
        })
        .catch((error) => {
           console.error("Error fetching Pokemon details:", error);
        });
    }

    function isCatched(pokemon) {
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

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-900">
        <div className="flex flex-col md:flex-row bg-red-600 rounded-lg shadow-2xl p-4 space-x-2 w-screen h-screen max-w-[90vw] max-h-[100vh] md:max-h-[80vh] lg:max-w-[70vw] space-y-4">

            {/*  Left/Top Panel  */}
            <div className="w-full h-1/2 md:h-full md:w-1/2 relative bg-red-500 rounded-lg p-3 flex flex-col space-y-2">
                {/*  Top circle  */}
                <div className="w-10 h-10 bg-blue-300 border-4 border-white rounded-full absolute -top-3 -left-3"></div>
                {/*  LEDs  */}
                <div className="flex space-x-1 ml-auto mr-2">
                    <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                {/*  Screen  */}
                <div className="bg-white p-5 rounded max-h-2/3">
                    <div className="bg-black h-full flex items-center justify-center overflow-hidden p-2">

                        {
                            <div className="flex flex-col items-start content-center w-full h-full text-white overflow-y-auto overflow-x-hidden" >
                                <div className="whitespace-nowrap w-full">
                                    <div className="inline-block animate-marquee">Click on the pokemon or flag it purple as caught. Click on the pokemon or flag it purple as caught. Click on the pokemon or flag it purple as caught.</div>
                                    {loading && (<div>Loading...</div>)}
                                    {pokemons && pokemons.results && (
                                        <div >
                                            <ul >
                                                {pokemons.results.map((pokemon, index) => (
                                                    <li key={pokemon.name} className="flex flex-row items-center" >
                                                        <img src={`${pokemonImageUrl}${index+1}.png`} alt={pokemon.name} onClick={() => showPokemon(index+1)} className="h-[40px] lg:h-[60px] lg:pr-[3rem] cursor-pointer" />
                                                        <span className="min-w-[18rem] cursor-pointer lg:text-[1.5rem]" onClick={() => showPokemon(index+1)}>{pokemon.name}</span>
                                                        <input
                                                            className="appearance-none w-6 h-6 rounded-full border-2 border-gray-700 bg-green-400 checked:bg-purple-600 checked:border-purple-800 shadow-inner focus:outline-none transition duration-300 cursor-pointer"
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
                            </div>

                        }

                    </div>
                </div>
                {/*  Controls  */}
                <div className="flex items-center justify-between px-1">
                    <div className="w-8 h-8 bg-black rounded-full"></div>
                    <div className="w-16 h-4 bg-gray-400 rounded"></div>
                    <div className="flex w-50 h-10 bg-green-400 mt-2 items-center justify-center">
                        <span className="text-black animate-pulse">battery low!</span>
                        </div>
                </div>
                {/*  D-pad  */}
                <div className="h-full flex items-end">
                    <div className="hidden md:flex flex-col items-center justify-center w-32 h-32 bg-black rounded-md">
                        <div className="w-4 h-12 bg-gray-600"></div>
                        <div className="flex">
                        <div className="w-12 h-4 bg-gray-600"></div>
                        <div className="w-4 h-4"></div>
                        <div className="w-12 h-4 bg-gray-600"></div>
                        </div>
                        <div className="w-4 h-12 bg-gray-600"></div>
                    </div>
                </div>
            
            </div>

            {/*  Right/Bottom Panel  */}
            <div className="flex flex-col justify-end w-full md:w-1/2 h-1/2 md:h-full bg-red-500 rounded-lg p-3 space-y-2 lg:space-y-8 ">
                {/*  Logo  */}
                <div className="flex justify-center content-center h-full flex-wrap">
                    <img className="max-h-[80px] flex-grow w-auto object-contain" src={logo} alt="pokedex logo" />

                </div>
                {/*  Top screen  */}
                <div className="bg-black min-h-1/3 w-full rounded-md p-2">
                    {selectedPokemon && <PokemonCard selectedPokemon={selectedPokemon} />}

                </div>
                {/*  Blue button grid  */}
                <div className="hidden md:grid grid-cols-4 gap-1 h-1/6">
                    <div className="bg-blue-400 h-full"></div>
                    <div className="bg-blue-400 h-full"></div>
                    <div className="bg-blue-400 h-full"></div>
                    <div className="bg-blue-400 h-full"></div>
                    <div className="bg-blue-400 h-full"></div>
                    <div className="bg-blue-400 h-full"></div>
                    <div className="bg-blue-400 h-full"></div>
                    <div className="bg-blue-400 h-full"></div>
                </div>
                {/*  Bottom buttons  */}
                <div className="flex justify-around space-x-2">
                    <div className="flex flex-row w-1/2 space-x-2">
                        <div className="w-1/5 aspect-square bg-white rounded"></div>
                        <div className="w-1/5 aspect-square bg-white rounded"></div>
                    </div>
                    <div className="size-10 aspect-square bg-yellow-400 rounded-full"></div>
                </div>
                <div className="flex h-1/10 space-x-2">
                    <div className="w-full min-h-8 bg-black rounded-md"></div>
                    <div className="w-full min-h-8 bg-black rounded-md"></div>
                </div>
            </div>

        </div>
    </div>
  )
}
