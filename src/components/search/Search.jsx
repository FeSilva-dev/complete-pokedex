import {useState} from 'react';
import styles from './search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { usePokemon } from '../../context/PokemonContext';

export function Search(){
  const {searchByInput, clearSearch, filterByNumber} = usePokemon();
  const [searchValue, setSearchValue] = useState("");

  function searchByValue(){
    if(searchValue === ""){
      alert("Digite algum valor para pesquisar");
      return;
    }
    searchByInput(searchValue);
    setSearchValue("");
  }

  return(
    <section className={styles.searchContainer}>
      <div className={styles.inputSearch}>
        <input 
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          type="text" 
          placeholder="Pesquisar por nome ou número"
        />
        <FontAwesomeIcon 
          icon={faSearch}
          onClick={searchByValue}
        />
        <button 
          className={styles.clearButton}
          type="button"
          onClick={clearSearch}
        >
          Limpar busca
        </button>
      </div>

      <div className={styles.filterSearch}>
        <span>Ordenar por</span>
        <select defaultValue={1} onChange={(event) => filterByNumber(event.target.value)}>
          <option value="1">Menor número primeiro</option>
          <option value="2">Maior número primeiro</option>
        </select>
      </div>
    </section>
  );
};