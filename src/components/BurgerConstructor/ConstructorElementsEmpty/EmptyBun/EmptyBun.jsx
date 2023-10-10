import styles from './emptyBun.module.css';

function EmptyBun({ bottomClass }) {
  const placeClass = bottomClass ? styles.bottom : styles.top

  return (
    <div className={`${styles.emptyBunBlock} ${placeClass}`}>
      <p className={styles.emptyBunText}>Перетащи сюда любимую булку</p>
    </div>
  );
}

export default EmptyBun;
