import React, { memo, FC } from 'react';
import styles from './ingredients.module.css'
import IngredientDetails from '../../components/Modals/IngredientDetails/IngredientDetails';

const Ingredients: FC = (): React.ReactElement => {
  return (
    <div className={styles.ingredientPage}>
      <IngredientDetails/>
    </div>
  );
}

export default memo(Ingredients);
