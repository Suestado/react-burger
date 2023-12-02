import React, { FC, useEffect } from 'react';
import styles from './ProfileOrders.module.css'
import { useDispatch, useSelector } from "../../services/hooks/reduxHooks";
import { WS_SERVER_ORDER_URL } from "../../utils/constants";
import { userOrdersConnect, userOrdersDisconnect } from "../../services/actions/userOrdersActions";
import OrderElement from "../OrderElement/OrderElement";
import { IOrderData } from "../../services/actions/orderLineActions";

const ProfileOrders: FC = (): React.ReactElement => {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('accessToken')
  const userOrders = useSelector((store) => store.userOrders.userOrdersData.orders)
  const userOrdersToShow = [...userOrders].reverse()

  useEffect(() => {
    dispatch(userOrdersConnect(`${WS_SERVER_ORDER_URL}?token=${accessToken?.replace('Bearer ', '')}`));
    return () => {
      dispatch(userOrdersDisconnect())
    }
  }, [])

  return (
    <section className={styles.ordersContainer}>
      {userOrdersToShow.map((order: IOrderData) => {
        return (
          <OrderElement
            key={order._id}
            rootLink={"/profile/orders"}
            orderNumber={order.number}
            orderName={order.name}
            orderTime={order.createdAt}
            ingredients={order.ingredients}
          />
        )
      })}
    </section>
  )
}

export default ProfileOrders
