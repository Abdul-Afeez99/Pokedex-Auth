import "./App.css";
import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import Form from "./components/loginform";
import { useQuery } from "@tanstack/react-query";

export const ThemeContext = React.createContext();

const fetchPokemonData = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await response.json();
    return(data.results);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
};

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [theme, setTheme] = useState('light');
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemonData,
  });

  const handlePokemonClick = (pokemonName) => {};
  if (isLoading) {
    return <div className="d">Loading...</div>;
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
    <div>
      <div className="app-container">
        <PokemonList pokemonList={data}  />
      </div>
    </div>
    </ThemeContext.Provider>
  );
};

export default App;
