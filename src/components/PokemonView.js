import React, { useEffect, useState } from 'react';

const PokemonView = props => {
  const [pokemon, setPokemon] = useState({
    name: '',
    species: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    type: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCharacter();
  }, []);

  const getCharacter = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setPokemon({
          name: data.name,
          species: data.species.name,
          image: data.sprites.other.dream_world.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          type: data.types[0].type.name
        });
        console.log(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (loading) return 'Loading...';

  return (
    <div className="display_section">
      <h1>Is it working</h1>
      {pokemon.name}
      <img src={pokemon.image} />
      <h3>Species: {pokemon.species}</h3>
      <h3>Type: {pokemon.type}</h3>
      <h3>HP: {pokemon.hp}</h3>
      <h3>Attack: {pokemon.attack}</h3>
      <h3>Defense: {pokemon.defense}</h3>
    </div>
  );
};

export default PokemonView;
