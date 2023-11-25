import React, { FC, useEffect } from 'react';
import styles from './OrderLine.module.css';
import { useDispatch } from "../../services/hooks/reduxHooks";
import { WS_SERVER_ALL_ORDERS_URL } from "../../utils/constants";
import { orderLineConnect } from "../../services/actions/orderLineActions";

const OrderLine: FC = (): React.ReactElement => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(orderLineConnect(WS_SERVER_ALL_ORDERS_URL))
  }, [])

  return (
    <section className={styles.mainContainer}>
      <header className={`text text_type_main-medium ${styles.header}`}>
        Лента заказов
      </header>
      <div>

      </div>
      <div>

      </div>
    </section>
  )
}

export default OrderLine;
