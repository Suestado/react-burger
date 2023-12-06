import React, { FC, useEffect } from 'react';
import styles from './OrderLine.module.css';
import { useDispatch, useSelector } from "../../services/hooks/reduxHooks";
import { WS_SERVER_ALL_ORDERS_URL } from "../../utils/constants";
import { IOrderData, orderLineConnect, orderLineDisconnect } from "../../services/actions/orderLineActions";
import OrderElement from "../../components/OrderElement/OrderElement";
import OrderCounter from "../../components/OrderCounter/OrderCounter";
import Preloader from "../../components/Preloader/Preloader";

const OrderLine: FC = (): React.ReactElement => {
  const dispatch = useDispatch()
  const {orders, total, totalToday} = useSelector((store) => store.orderLine.orderLineData);

  useEffect(() => {
    dispatch(orderLineConnect(WS_SERVER_ALL_ORDERS_URL));
    return () => {
      dispatch(orderLineDisconnect())
    }
  }, [dispatch])

  const getOrderNumbersReady = (): number[] => {
    let readyOrders: number[] = [];
    orders.forEach((item) => {
      if(item.status === 'done') {
        readyOrders.push(item.number)
      }
    })
    return readyOrders;
  }

  const getOrderNumbersInProcess = (): number[] => {
    let inProcessOrders: number[] = [];
    orders.forEach((item) => {
      if(item.status !== 'done') {
        inProcessOrders.push(item.number)
      }
    })
    return inProcessOrders;
  }

  return (
    <>
      {!orders.length ? <Preloader/> :
      <section className={styles.mainContainer}>
        <header className={`text text_type_main-medium ${styles.header}`}>
          Лента заказов
        </header>
        <div className={styles.orderCards}>
          {orders.map((order: IOrderData) => {
            return (
              <OrderElement
                key={order._id}
                rootLink={"/feed"}
                orderNumber={order.number}
                orderName={order.name}
                orderTime={order.createdAt}
                ingredients={order.ingredients}
              />
            )
          })}
        </div>
        <div className="">
          <OrderCounter
            readyItems={getOrderNumbersReady()}
            inProcessItems={getOrderNumbersInProcess()}
            total={total}
            totalToday={totalToday}
          />
        </div>
      </section>}
    </>
  )
}

export default OrderLine;
