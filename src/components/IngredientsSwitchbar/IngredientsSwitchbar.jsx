import { useState } from 'react';
import styles from './ingredientsSwitchbar.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientsSwitchbar() {
  const [current, setCurrent] = useState('one');

  return (
    <div className={styles.ingredientsSwitchbar}>
      <a className={styles.link} href="#bun">
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
      </a>
      <a className={styles.link} href="#sauce">
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
      </a>
      <a className={styles.link} href="#main">
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </a>
    </div>
  );
}

export default IngredientsSwitchbar;
