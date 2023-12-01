import React, { FC, useEffect } from 'react';
import styles from './OrderDetailsPage.module.css';
import LineOrderDetails from "../../components/Modals/LineOrderDetails/LineOrderDetails";
import { useDispatch } from "../../services/hooks/reduxHooks";
import { orderLineConnect } from "../../services/actions/orderLineActions";
import { WS_SERVER_ALL_ORDERS_URL } from "../../utils/constants";
import getIngredients from "../../services/actions/fullIngredientsListActions";

const OrderDetailsPage: FC = (): React.ReactElement => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(orderLineConnect(WS_SERVER_ALL_ORDERS_URL))
  }, [])

  return (
    <div className={styles.orderDetailsPage}>
      <LineOrderDetails/>
    </div>
  )
}

export default OrderDetailsPage;
