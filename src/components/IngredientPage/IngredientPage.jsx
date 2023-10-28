import { memo } from 'react';
import styles from './ingredientPage.module.css'
import IngredientDetails from '../Modals/IngredientDetails/IngredientDetails';

function IngredientPage() {
  return (
    <div className={styles.ingredientPage}>
      <IngredientDetails/>
    </div>
  );
}

export default memo(IngredientPage);
