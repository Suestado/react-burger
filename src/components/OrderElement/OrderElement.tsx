import React, { FC, memo } from 'react';
import styles from './OrderElement.module.css'
import OrderIngredientLogo from "./OrderIngredientLogo/OrderIngredientLogo";
import { useSelector } from "../../services/hooks/reduxHooks";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from "react-router-dom";
import { getOrderDateString } from "../../utils/functions/getOrderDateString";
import { getFullOrderCost } from "../../utils/functions/getFullOrderCost";

interface IOrderElement {
  rootLink: string;
  orderNumber: number;
  orderName: string;
  orderTime: string;
  ingredients: string[];
}

const OrderElement: FC<IOrderElement> = (
  {
    rootLink,
    orderNumber,
    orderName,
    orderTime,
    ingredients
  }
): React.ReactElement => {
  const ingredientsList = useSelector((store) => store.ingredients.fullIngredientList);
  const location = useLocation();
  const finalIngredients = ingredients.filter(Boolean)

  const choseIngredients = (ingredients: string[]): React.ReactElement[] => {
    let ingredientsToShow: React.ReactElement[] = [];
    for (let i = 0; i <= ingredients.length - 1; i++) {
      if (i < 5) {
        ingredientsToShow.push(
          <OrderIngredientLogo
            key={i}
            ingredientId={ingredients[i]}
            zIndexAdjastment={6-i}
          />
        )
      }
      if (i === 5) {
        ingredientsToShow.push(
          <OrderIngredientLogo
            key={i}
            ingredientId={ingredients[i]}
            zIndexAdjastment={6-i}
            lastIngredient={ingredients.length - 5}
          />
        )
      }
    }
    return ingredientsToShow
  }

  return (
    <Link to={`${rootLink}/${orderNumber}`} className={styles.orderLineLink} state={{ backgroundLocation: location }}>
      <div className={styles.cardLayout}>
        <div className={styles.numDateContainer}>
          <p className={`text text_type_digits-default ${styles.numberText}`}>{`#${orderNumber}`}</p>
          <p className={`text text_type_main-default text_color_inactive ${styles.dateText}`}>{getOrderDateString(orderTime)}</p>
        </div>
        <p className={`text text_type_main-medium ${styles.orderName}`}>{orderName}</p>
        <div className={styles.ingredientsContainer}>
          <div className={styles.ingredients}>
            {choseIngredients(ingredients)}
          </div>
          <div className={styles.orderPriceContainer}>
            <p className={`text text_type_digits-default ${styles.priceTag}`}>{getFullOrderCost(ingredientsList, finalIngredients)}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(OrderElement)
