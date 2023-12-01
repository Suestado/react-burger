import React, { FC } from 'react';
import styles from './IngredientDetailsCard.module.css';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIngredientLogo from "../../../OrderElement/OrderIngredientLogo/OrderIngredientLogo";
import { useSelector } from "../../../../services/hooks/reduxHooks";
import { IngredientInterface } from "../../../../utils/commonTypes";

interface IIngredientDetailsCard {
  ingredientId: string;
  quantity: number
}

const IngredientDetailsCard: FC<IIngredientDetailsCard> = ({ingredientId, quantity}): React.ReactElement => {
  const { fullIngredientList} = useSelector((store) => store.ingredients)
  const ingredientName = fullIngredientList.find((item: IngredientInterface) => {
    return item._id === ingredientId
  }).name;
  const ingredientCost = fullIngredientList.find((item: IngredientInterface) => {
    return item._id === ingredientId
  }).price

  return (
    <div className={styles.ingredientWrapper}>
      <div className={styles.ingredientLogo}>
        <OrderIngredientLogo
          ingredientId={ingredientId}
        />
      </div>
      <h3 className="text text_type_main-default">{ingredientName}</h3>
      <div className={styles.costWrapper}>
        <p className={styles.cost}>{(quantity - 1) ? `${quantity} x ${ingredientCost}` : `${ingredientCost}`}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  )
}

export default IngredientDetailsCard;
