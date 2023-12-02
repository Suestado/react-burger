import React, { FC } from 'react';
import styles from './ingredientsSwitchbar.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

interface IIngredientsSwitchbar {
  activeTab: string,
}

const IngredientsSwitchbar: FC<IIngredientsSwitchbar> = ({activeTab}): React.ReactElement => {

  return (
    <div className={styles.ingredientsSwitchbar}>
      <a className={styles.link} href="#bun">
        <Tab value="one" active={activeTab === 'bun'} onClick={() => void 0}>
          Булки
        </Tab>
      </a>
      <a className={styles.link} href="#sauce">
        <Tab value="two" active={activeTab === 'sauce'} onClick={() => void 0}>
          Соусы
        </Tab>
      </a>
      <a className={styles.link} href="#main">
        <Tab value="three" active={activeTab === 'main'} onClick={() => void 0}>
          Начинки
        </Tab>
      </a>
    </div>
  );
}

export default IngredientsSwitchbar;
