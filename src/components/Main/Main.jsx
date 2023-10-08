import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './main.module.css';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import getIngredients from '../../services/actions/fullIngredientsList_actions';

function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  return (
      <main className={styles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
  );
}

export default Main;
