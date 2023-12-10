import { useQuery } from "@tanstack/react-query";
import React, { forwardRef } from "react";
import { useParams } from "react-router-dom";
import SignOutButton from "./signout";


const fetchPokemonDetails = async (pokemonName) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  }
};

const PokemonDetails = forwardRef(({}, ref) => {
  const { pokemonName } = useParams();
  const { data: pokemonDetails } = useQuery({
    queryKey: ["pokemnon", pokemonName],
    queryFn: () => fetchPokemonDetails(pokemonName),
  });

  const renderAbilities = (abilities) => {
    return abilities.map((ability) => ability.ability.name).join(", ");
  };

  const renderTypes = (types) => {
    return types.map((type) => type.type.name).join(", ");
  };

  const renderStats = (stats) => {
    return stats.map((stat) => (
      <li key={stat.stat.name}>
        {stat.stat.name}: {stat.base_stat}
      </li>
    ));
  };

  const renderPokemonDetails = () => {
    if (!pokemonDetails) {
      return null;
    }

    const { name, abilities, types, stats } = pokemonDetails;

    return (
      <div>
        <SignOutButton />
        <h2>{name}</h2>
        <div>Abilities: {renderAbilities(abilities)}</div>
        <div>Types: {renderTypes(types)}</div>
        <div>Stats:</div>
        <ul>{renderStats(stats)}</ul>
      </div>
    );
  };

  return (
    <div className="details" ref={ref}>
      {renderPokemonDetails()}
    </div>
  );
});

export default PokemonDetails;
