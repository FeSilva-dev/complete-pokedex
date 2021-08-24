import {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';

export const PokemonContext = createContext({});

export function PokemonContextProvider({children}){
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [optionToFilter, setOptionToFilter] = useState("");

  useEffect(() => {
    async function getAllPokemonInfo(){
      let results = [];
      try{
        const response = await axios.get('https://unpkg.com/pokemons@1.1.0/pokemons.json');
  
        const resultsSorted = removeDuplicate(response.data.results)
  
        resultsSorted.forEach((pokeInfo) => {
          results.push(...pokeInfo.type);
        });
  
        setPokemonTypes(
          Array.from(new Set(results))
        );
        setPokemonList(resultsSorted);
      }catch(error){
        console.log(`Failed to get pokemon list: ${error}`);
      };
    }

    getAllPokemonInfo();
  }, []);

  useEffect(() => {
    function filterPokemonByNumber(){
      if(optionToFilter === "2"){
        const sortedByNumber = 
          pokemonList.sort((a, b) => {
            return Number(a.national_number) > Number(b.national_number) ? 1 : Number(a.national_number) < Number(b.national_number) ? -1 : 0;
          });
        setPokemonList(sortedByNumber);
      }else{
        const sortedByNumber =
          pokemonList.sort((a, b) => {
            return Number(a.national_number) < Number(b.national_number) ? 1 : Number(a.national_number) > Number(b.national_number) ? -1 : 0;
          });
        setPokemonList(sortedByNumber);
      };
    }
    filterPokemonByNumber();
  }, [optionToFilter, pokemonList]);

  function removeDuplicate(array){
    const resultsSorted = array.filter((pokemon, index, self) =>
      index === self.findIndex((pokemonToFilter) => (
        pokemonToFilter.national_number === pokemon.national_number && pokemonToFilter.name === pokemon.name
      ))
    );

    resultsSorted.map(poke => {
      poke.favorite = false;
      return poke;
    });

    return resultsSorted;
  }

  function setFavoritePokemon(pokemon){
    const newPokemonState = pokemonList.map(poke => {
      if(poke.national_number === pokemon.national_number){
        poke.favorite = !poke.favorite;
      };
      return poke;
    });
    setPokemonList(newPokemonState)
  }

  async function filterPoke(typeFilter){
    try{
      const filteredPoke = [];

      const response = await axios.get('https://unpkg.com/pokemons@1.1.0/pokemons.json');

      const resultsSorted = removeDuplicate(response.data.results);

      if(typeFilter !== ""){
        resultsSorted.map(poke => {
          poke.favorite = false;
          return poke;
        }).forEach((pokeInfo => {
          pokeInfo.type.forEach(type => {
            if(type === typeFilter){
              filteredPoke.push(pokeInfo);
            };
          });
        }));
        setPokemonList(filteredPoke);
      }else{
        resultsSorted.map(poke => {
          poke.favorite = false;
          return poke;
        });
        setPokemonList(resultsSorted);
      }

    }catch(error){
      console.log(`Failed to filter: ${error}`);
    }
  }

  function searchByInput(value){
    const filteredUnique = pokemonList.filter(pokemon => {
      return pokemon.name.toLowerCase() === value.toLowerCase() || pokemon.national_number === value
    });
    setPokemonList(filteredUnique)
  }

  async function clearSearch(){
    try{
      const response = await axios.get('https://unpkg.com/pokemons@1.1.0/pokemons.json');

      const resultsSorted = removeDuplicate(response.data.results);

      resultsSorted.map(poke => {
        poke.favorite = false;
        return poke;
      });
      setPokemonList(resultsSorted);
    }catch(error){
      console.log(`Failed to clear search: ${error}`);
    };
  }

  function filterByNumber(value){
    setOptionToFilter(value);
  }

  return(
    <PokemonContext.Provider
      value={{
        removeDuplicate,
        setFavoritePokemon,
        filterPoke,
        searchByInput,
        clearSearch,
        filterByNumber,
        pokemonTypes,
        pokemonList,
        optionToFilter
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  return useContext(PokemonContext);
}