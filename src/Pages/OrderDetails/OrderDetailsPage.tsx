import React, { FC, useEffect } from 'react';
import styles from './OrderDetailsPage.module.css';
import LineOrderDetails from "../../components/Modals/LineOrderDetails/LineOrderDetails";
import { useDispatch } from "../../services/hooks/reduxHooks";
import { orderLineConnect, orderLineDisconnect } from "../../services/actions/orderLineActions";
import { WS_SERVER_ALL_ORDERS_URL, WS_SERVER_ORDER_URL } from "../../utils/constants";
import getIngredients from "../../services/actions/fullIngredientsListActions";
import { useLocation } from "react-router-dom";
import { userOrdersConnect, userOrdersDisconnect } from "../../services/actions/userOrdersActions";

const OrderDetailsPage: FC = (): React.ReactElement => {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('accessToken')
  const location = useLocation()

  useEffect(() => {
    dispatch(getIngredients());
    if(location.pathname.split("/")[1] === 'feed') {
      dispatch(orderLineConnect(WS_SERVER_ALL_ORDERS_URL))
    } else {
      dispatch(userOrdersConnect(`${WS_SERVER_ORDER_URL}?token=${accessToken?.replace('Bearer ', '')}`));
    }

    return () => {
      dispatch(orderLineDisconnect())
      dispatch(userOrdersDisconnect())
    }
  }, [])

  return (
    <div className={styles.orderDetailsPage}>
      <LineOrderDetails/>
    </div>
  )
}

export default OrderDetailsPage;
