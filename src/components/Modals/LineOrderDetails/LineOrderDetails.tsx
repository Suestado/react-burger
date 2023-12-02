import React, { FC } from 'react';
import styles from './LineOrderDetails.module.css';
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "../../../services/hooks/reduxHooks";
import { createSelector } from "reselect";
import { RootState } from "../../../services/actions/types";
import { IOrderData } from "../../../services/actions/orderLineActions";
import Preloader from "../../Preloader/Preloader";
import { CurrencyIcon, CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetailsCard from "./IngredientDetailsCard/IngredientDetailsCard";
import { getOrderDateString } from "../../../utils/functions/getOrderDateString";
import { getFullOrderCost } from "../../../utils/functions/getFullOrderCost";

interface ILineOrderDetails {
  closeModal?: () => void;
  scroll?: boolean;
}

const selectOrdersList = (store: RootState) => store.orderLine.orderLineData.orders;
const selectUserOrdersList = (store: RootState) => store.userOrders.userOrdersData.orders;

const LineOrderDetails: FC<ILineOrderDetails> = ({closeModal, scroll}): React.ReactElement => {
  const ingredientsList = useSelector((store) => store.ingredients.fullIngredientList);
  const orderNumber = useParams().number;
  const location = useLocation()
  const chooseOrderList = location.pathname.split("/")[1] === 'feed' ? selectOrdersList : selectUserOrdersList

  const selectOrderCard = createSelector(
    [chooseOrderList],
    (allOrders) => {
      return allOrders?.find((item) => orderNumber && item.number === +orderNumber);
    },
  );
  const orderCard = useSelector(selectOrderCard);

  if (!orderCard) {
    return <Preloader/>
  }

  const {
    ingredients,
    name,
    createdAt,
    number,
    status
  } = orderCard as IOrderData;

  const finalIngredients: string[] = ingredients.filter(Boolean)

  interface IingredientsCollection {
    [key: string]: number
  }

  const ingredientsCollection: IingredientsCollection = {}
  finalIngredients.forEach((id) => {
    if (ingredientsCollection[id]) {
      ingredientsCollection[id] = ingredientsCollection[id] + 1
    } else {
      ingredientsCollection[id] = 1
    }
  })

  const ingredientsToShow: string[] = [];
  for (let key in ingredientsCollection) {
    ingredientsToShow.push(key)
  }

  return (
    <>
      {!orderCard && <Preloader/>}

      {orderCard &&
        <section className={styles.popupWrapper}>
          {closeModal &&
            <div
              className={styles.closeIcon}
              onClick={closeModal}
            >
              <CloseIcon type="primary"/>
            </div>
          }
          <p className={`text text_type_digits-default ${styles.orderNumber}`}>{`#${number}`}</p>
          <h2 className={`text text_type_main-medium ${styles.orderName}`}>{name}</h2>
          <p className={`text text_type_main-default ${styles.orderStatus}`}>
            {status === 'done' ? "Выполнен" : "В работе"}
          </p>
          <p className={`text text_type_main-medium ${styles.orderIngredientsHeader}`}>Состав:</p>
          <div className={`${styles.orderIngredientsWrapper} ${scroll && styles.orderIngredientsWrapperScroll}`}>
            {ingredientsToShow.map((id) => {
              return (
                <IngredientDetailsCard
                  key={id}
                  ingredientId={id}
                  quantity={ingredientsCollection[id]}
                />
              )
            })}
          </div>
          <div className={styles.modalFooter}>
            <p className={`text text_type_main-default text_color_inactive`}>{getOrderDateString(createdAt)}</p>
            <div className={styles.orderCostWrapper}>
              <p className={`text text_type_digits-default ${styles.orderCost}`}>{getFullOrderCost(ingredientsList, finalIngredients)}</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default LineOrderDetails;
