import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './signout';

const getPokemonIdFromUrl = (url) => {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2];
};

const renderPokemonItem = (pokemon, onPokemonClick, detailsRef) => {
  const pokemonId = getPokemonIdFromUrl(pokemon.url);

  return (
    <Link to={`/pokemon/${pokemon.name}`}><li
      key={pokemon.name}
    >
      <div className="item">
        <p>{pokemon.name}</p>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          alt={pokemon.name}
        />
        <p>ID: {pokemonId}</p>
      </div>
    </li></Link>
  );
};

const PokemonList = ({ pokemonList, onPokemonClick }) => {
  const detailsRef = useRef(null);

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.style.display = 'none';
    }
  }, []);

  return (
    <div className="list-container">
      <SignOutButton />
      <ul className="list">
        {pokemonList.map((pokemon) =>
          renderPokemonItem(pokemon, onPokemonClick, detailsRef)
        )}
      </ul>
    </div>
  );
};

export default PokemonList;
