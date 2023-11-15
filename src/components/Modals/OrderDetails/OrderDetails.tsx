import React, {FC} from 'react';
import styles from './orderDetails.module.css';
import okImage from '../../../images/done.png';

interface IOrderDetails {
  orderNumber: number
}

const OrderDetails: FC<IOrderDetails> = ({orderNumber}): React.ReactElement => {
  return (
    <div className={styles.orderDetails}>
      <p className={`text text_type_digits-large ${styles.number}`}>{orderNumber}</p>
      <h2 className="text text_type_main-medium">идентификатор заказа</h2>
      <img className={styles.okImage} src={okImage} alt="Заказ принят"/>
      <p className={`text text_type_main-default ${styles.infoText}`}>Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;
