import React, { useEffect, useState } from 'react';
import PokemonThumb from './PokemonThumb';

const Home = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=20'
  );
  const [loading, setLoading] = useState(true);

  // const getAllPokemons = async () => {
  //   const res = await fetch(loadMore)
  //   const data = await res.json()

  //   console.log(data)
  //   setLoadMore(data.next)

  //   function createPokemonObject(results)  {
  //     results.forEach( async pokemon => {
  //       const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
  //       const data =  await res.json()
  //       setAllPokemons( currentList => [...currentList, data])
  //       // await allPokemons.sort((a, b) => a.id - b.id)
  //     })
  //   }
  //   createPokemonObject(data.results)
  // }

  const getAllPokemons = () => {
    fetch(loadMore)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(data => {
        setLoadMore(data.next);
        // console.log(typeof data.results);
        data.results.forEach(pokemon => {
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then(res => {
              return res.json();
            })
            .then(data => {
              console.log('line 47 data', data);
              setAllPokemons(currentList => [...currentList, data]);
            });

          allPokemons.sort((a, b) => a.id - b.id);
        });

        // createPokemonObject(data.results);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  if (loading) return 'Loading...';

  const renderPokemos = () => {
    return allPokemons.map((pokemonStats, index) => (
      <PokemonThumb
        key={index}
        id={pokemonStats.id}
        image={pokemonStats.sprites.other.dream_world.front_default}
        name={pokemonStats.name}
        type={pokemonStats.types[0].type.name}
        // {...pokemonStats}
      />
    ));
  };

  return (
    <div className="app-contaner">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">{renderPokemos()}</div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default Home;
