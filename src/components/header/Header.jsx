import styles from './header.module.scss';
import pokeball from '../../assets/pokeball.svg'
import synvia from '../../assets/synvia-A.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export function Header(){
  return(
    <header className={styles.headerContainer}>
      <div className={styles.container}>
        <div className={styles.iconHeader}>
          <img src={pokeball} alt="pokedex logo"/>
          <h1>Pokédex</h1>
        </div>
        <div className={styles.exitHeader}>
          <img src={synvia} alt="synvia logo"/>
          <FontAwesomeIcon icon={faSignOutAlt} size="2x" cursor="pointer"/>
        </div>
      </div>
    </header>
  );
};