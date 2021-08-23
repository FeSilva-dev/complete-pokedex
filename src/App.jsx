import axios from 'axios';
import {useState, useEffect} from 'react';
import { Cards } from './components/cards/Cards';
import { Filter } from './components/filter/Filter';
import { Header } from './components/header/Header';
import { Search } from './components/search/Search';
import styles from './styles/app.module.scss';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  async function getAllPokemonInfo(){
    try{
      const response = await axios.get('https://unpkg.com/pokemons@1.1.0/pokemons.json');

      const resultsSorted = response.data.results.filter((pokemon, index, self) =>
        index === self.findIndex((pokemonToFilter) => (
          pokemonToFilter.national_number === pokemon.national_number && pokemonToFilter.name === pokemon.name
        ))
      );
      resultsSorted.map(poke => {
        poke.favorite = false;
        return poke;
      });

      setPokemonList(resultsSorted);
    }catch(error){
      console.log(`Failed to get pokemon list: ${error}`);
    };
  }

  useEffect(() => {
    getAllPokemonInfo();
  }, []);

  function setFavoritePokemon(pokemon){
    const newPokemonState = pokemonList.map(poke => {
      if(poke.national_number === pokemon.national_number){
        poke.favorite = !poke.favorite;
      };
      return poke;
    });

    setPokemonList(newPokemonState)
  }

  return (
    <div>
      <Header />
      <Search />
      <section className={styles.pokeSection}>
        <Filter />
        <Cards 
          pokemonList={pokemonList}
          setFavoritePokemon={setFavoritePokemon}
        />
      </section>
    </div>
  );
}

export default App;
