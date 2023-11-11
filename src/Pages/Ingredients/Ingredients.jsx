import { memo } from 'react';
import styles from './ingredients.module.css'
import IngredientDetails from '../../components/Modals/IngredientDetails/IngredientDetails';

function Ingredients() {
  return (
    <div className={styles.ingredientPage}>
      <IngredientDetails/>
    </div>
  );
}

export default memo(Ingredients);
