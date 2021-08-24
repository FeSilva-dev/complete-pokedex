import { useState } from 'react';
import { usePokemon } from '../../context/PokemonContext';
import styles from './filter.module.scss';

export function Filter(){
  const [typeToFilter, setTypeToFilter] = useState("");
  const {pokemonTypes, filterPoke} = usePokemon();

  function setFilterType(type){
    if(type === typeToFilter){
      setTypeToFilter("");
      filterPoke("");
    }else{
      setTypeToFilter(type);
      filterPoke(type);
    }
  }

  return(
    <aside className={styles.asideContainer}>
      <h3>Filtrar por tipo</h3>
      <div className={styles.filterType}>
        {pokemonTypes.map((type, index) => (
          <span 
            className={type === typeToFilter ? styles.isActiveFilter : ""}
            key={index} 
            onClick={() => setFilterType(type)}
          >
            {type}
          </span>
        ))}
      </div>
      <h3>Filtrar favorito</h3>
      <div className={styles.switchFavorite}>Filtrar</div>
    </aside>
  );
};