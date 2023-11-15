import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './main.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import getIngredients from '../../services/actions/fullIngredientsListActions';

const Main: FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(getIngredients());
  }, []);

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