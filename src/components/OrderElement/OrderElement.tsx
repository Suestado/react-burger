import React, { FC, memo } from 'react';
import styles from './OrderElement.module.css'
import OrderIngredientLogo from "./OrderIngredientLogo/OrderIngredientLogo";
import { useSelector } from "../../services/hooks/reduxHooks";
import { IngredientInterface } from "../../utils/commonTypes";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderElement {
  orderId: string;
  orderNumber: number;
  orderName: string;
  orderTime: string;
  ingredients: string[];
}

const OrderElement: FC<IOrderElement> = (
  {
    orderId,
    orderNumber,
    orderName,
    orderTime,
    ingredients
  }
): React.ReactElement => {
  const ingredientsList = useSelector((store) => store.ingredients.fullIngredientList);

  const checkDate = (orderTime: string) => {
    const currentDate = new Date();
    const orderDate = new Date(Date.parse(orderTime))
    const orderDay = orderDate.getDate()
    const orderHours = orderDate.getHours();
    const orderMin = orderDate.getMinutes();
    const dateDiff = currentDate.getDate() - orderDay;

    switch (dateDiff) {
      case (0): {
        return `Сегодня, ${orderHours}:${orderMin}`
      }
      case (1): {
        return `Вчера, ${orderHours}:${orderMin}`
      }
      default: {
        const lastNumber = dateDiff >= 10 ? dateDiff % 10 : dateDiff

        const daySpell =
          dateDiff >= 11 && dateDiff <= 20 ? "дней"
            : lastNumber === 1 ? "день"
              : lastNumber >= 2 && lastNumber <= 4 ? "дня"
                : "дней"
        return `${dateDiff} ${daySpell} назад, ${orderHours}:${orderMin}`
      }
    }
  }

  const choseIngredients = (ingredients: string[]): React.ReactElement[] => {
    let ingredientsToShow = [];
    for (let i = 0; i <= ingredients.length - 1; i++) {
      if (i < 5) {
        ingredientsToShow.push(
          <OrderIngredientLogo
            key={i}
            ingredientId={ingredients[i]}
            zIndexAdjastment={i}
          />
        )
      }
      if (i === 5) {
        ingredientsToShow.push(
          <OrderIngredientLogo
            key={i}
            ingredientId={ingredients[i]}
            zIndexAdjastment={i}
            lastIngredient={ingredients.length - 5}
          />
        )
      }
    }
    return ingredientsToShow
  }

  const orderCost = (ingredients: string[]): number => {
    let cost: number = 0;
    ingredients.forEach((elementId: string) => {
      cost += ingredientsList.find((item: IngredientInterface) => item._id === elementId).price
    })
    return cost;
  }

  return (
    <div className={styles.cardLayout}>
      <div className={styles.numDateContainer}>
        <p className={`text text_type_digits-default ${styles.numberText}`}>{`#${orderNumber}`}</p>
        <p className={`text text_type_main-default text_color_inactive ${styles.dateText}`}>{checkDate(orderTime)}</p>
      </div>
      <p className={`text text_type_main-medium ${styles.orderName}`}>{orderName}</p>
      <div className={styles.ingredientsContainer}>
        <div className={styles.ingredients}>
          {choseIngredients(ingredients)}
        </div>
        <div className={styles.orderPriceContainer}>
          <p className={`text text_type_digits-default ${styles.priceTag}`}>{orderCost(ingredients)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}


export default memo(OrderElement)
