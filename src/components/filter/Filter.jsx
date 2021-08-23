import styles from './filter.module.scss';

export function Filter(){
  return(
    <aside className={styles.asideContainer}>
      <h3>Filtrar por tipo</h3>
      <div className={styles.filterType}>
        <span>oi</span>
        <span>oi123</span>
        <span>oi123455</span>
        <span>oi123</span>
        <span>oi4535</span>
        <span>o6575i</span>
        <span>oi567</span>
        <span>oi6575</span>
      </div>
      <h3>Filtrar favorito</h3>
      <div className={styles.switchFavorite}>Filtrar</div>
    </aside>
  );
};