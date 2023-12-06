import React, { FC, memo } from 'react';
import styles from './OrderIngredientLogo.module.css'
import { useSelector } from "../../../services/hooks/reduxHooks";
import { IngredientInterface } from "../../../utils/commonTypes";

export interface IOrderIngredientLogo {
  ingredientId: string;
  zIndexAdjastment?: number;
  lastIngredient?: number;
}

const OrderIngredientLogo: FC<IOrderIngredientLogo> = ({ingredientId, zIndexAdjastment, lastIngredient}): React.ReactElement => {
  const ingredientsList = useSelector((store) => store.ingredients.fullIngredientList);
  const targetIngredient =  ingredientsList.filter((ingredient: IngredientInterface) => {
    return ingredient._id === ingredientId;
  })
  const imageUrl: string = targetIngredient[0]?.image;
  const zIndex = zIndexAdjastment ? zIndexAdjastment : 1;

  return (
    <div className={styles.ingredient} style={{zIndex: zIndex}}>
      <img className={`${styles.image} ${lastIngredient && styles.imageBlured}`} src={imageUrl} alt="ингредиент"/>
      {lastIngredient && <p className={`text text_type_main-medium ${styles.additionalIngredients}`}>{`+${lastIngredient}`}</p>}
    </div>
  )
}

export default  memo(OrderIngredientLogo);
