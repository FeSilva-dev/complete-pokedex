import { Cards } from './components/cards/Cards';
import { Filter } from './components/filter/Filter';
import { Header } from './components/header/Header';
import { Search } from './components/search/Search';
import styles from './styles/app.module.scss';

function App() {
  return (
    <div>
      <Header />
      <Search />
      <section className={styles.pokeSection}>
        <Filter />
        <Cards />
      </section>
    </div>
  );
}

export default App;
