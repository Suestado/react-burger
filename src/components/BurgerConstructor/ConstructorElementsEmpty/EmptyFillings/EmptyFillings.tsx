import React from 'react';
import styles from './emptyFillings.module.css'

function EmptyFillings(): React.ReactElement {
  return (
    <div className={styles.emptyFillingsBlock}>
      <p className={styles.emptyFillingsText}>Перетащи сюда любимую начинку</p>
    </div>
  )
}

export default EmptyFillings;
