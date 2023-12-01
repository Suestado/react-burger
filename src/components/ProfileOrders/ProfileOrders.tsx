import React, { FC, useEffect } from 'react';
import styles from './ProfileOrders.module.css'
import { useDispatch } from "../../services/hooks/reduxHooks";
import { WS_SERVER_ORDER_URL } from "../../utils/constants";
import { userOrdersConnect } from "../../services/actions/userOrdersActions";

const ProfileOrders: FC = (): React.ReactElement => {
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    dispatch(userOrdersConnect(`${WS_SERVER_ORDER_URL}?token=${accessToken}`));
  }, [])


  return (
    <section className={styles.ordersContainer}>

    </section>
  )
}

export default ProfileOrders
