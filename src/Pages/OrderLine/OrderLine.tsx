import React, { FC } from 'react';
import styles from './OrderLine.module.css';

const OrderLine: FC = (): React.ReactElement => {
  return (
    <section className={styles.mainContainer}>
      <header className={`text text_type_main-medium ${styles.header}`}>
        Лента заказов
      </header>
      <div>

      </div>
      <div>

      </div>
    </section>
  )
}

export default OrderLine;
