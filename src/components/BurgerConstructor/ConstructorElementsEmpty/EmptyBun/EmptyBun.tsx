import {FC} from 'react';
import styles from './emptyBun.module.css';

const EmptyBun: FC<{ bottomClass?: boolean }> = ({bottomClass}) => {
  const placeClass: string = bottomClass ? styles.bottom : styles.top;

  return (
    <div className={`${styles.emptyBunBlock} ${placeClass}`}>
      <p className={styles.emptyBunText}>Перетащи сюда любимую булку</p>
    </div>
  );
}

export default EmptyBun;
