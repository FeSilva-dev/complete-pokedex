import { Cards } from './components/cards/Cards';
import { Filter } from './components/filter/Filter';
import { Header } from './components/header/Header';
import { Search } from './components/search/Search';
import { PokemonContextProvider } from './context/PokemonContext';
import styles from './styles/app.module.scss';

function App() {
  return (
    <PokemonContextProvider>
      <div>
        <Header />
        <Search />
        <section className={styles.pokeSection}>
          <Filter />
          <Cards />
        </section>
      </div>
    </PokemonContextProvider>
  );
}

export default App;
