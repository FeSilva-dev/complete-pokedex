import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePokemon } from '../../context/PokemonContext';
import styles from './cards.module.scss';

export function Cards(){
  const {pokemonList, setFavoritePokemon} = usePokemon();
  return(
    <section className={styles.cardsContainer}>
      {pokemonList.map((pokemon, index) => (
        <div className={styles.cardSingle} key={index}>
          <div className={styles.imgPoke}>
            <div 
              className={ styles.iconHeart } 
            >
              <FontAwesomeIcon 
                className={pokemon.favorite ? styles.isFavorite : ""}
                icon={faHeart} 
                color="red" 
                cursor="pointer" onClick={() => setFavoritePokemon(pokemon)}
              />
            </div>
            <img 
              src={pokemon.sprites.large} 
              alt={pokemon.name}
            />
          </div>
          <div className={styles.cardInfo}>
            <span>Nº {pokemon.national_number}</span>
            <h3>{pokemon.name}</h3>
            <div className={styles.pokeType}>
              {pokemon.type.map((type, index) => (
                <span className={type} key={index}>{type}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};