import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './main.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const Main: FC = (): React.ReactElement => {

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </DndProvider>
  );
}

export default Main;
