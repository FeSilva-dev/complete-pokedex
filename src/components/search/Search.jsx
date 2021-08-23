import {useState} from 'react';
import styles from './search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export function Search(){
  const [searchValue, setSearchValue] = useState("");

  function searchByValue(){

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
      </div>

      <div className={styles.filterSearch}>
        <span>Ordenar por</span>
        <select>
          <option value="1">Menor número primeiro</option>
          <option value="2">Maior número primeiro</option>
        </select>
      </div>
    </section>
  );
};