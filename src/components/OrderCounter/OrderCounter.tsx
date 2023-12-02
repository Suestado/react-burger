import React, { FC } from 'react';
import styles from './OrderCounter.module.css';

interface IOrderCounter {
  readyItems: number[];
  inProcessItems: number[];
  total: number;
  totalToday: number;
}

const OrderCounter: FC<IOrderCounter> = ({readyItems, inProcessItems, total, totalToday}): React.ReactElement => {

  const addThouthandSpace = (number: number): string => {
    return number
      .toString()
      .split('')
      .reverse()
      .map((char, i) => char + (i % 3 ? '' : ' '))
      .reverse()
      .join('')
  }

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.orderNumbersWrapper}>
        <h3 className={`text text_type_main-medium`}>Готовы:</h3>
        <div className={styles.readyOrders}>
          {readyItems.map((item, index) => {
            return (
              <p
                key={index}
                className={`text text_type_digits-default ${styles.readyOrdersNumber}`}
              >{item}</p>
            )
          })}
        </div>
        <h3 className={`text text_type_main-medium`}>В работе:</h3>
        <div className={`text text_type_digits-default ${styles.inProgressOrders}`}>
          {inProcessItems.map((item) => {
            return (
              <p className={`text text_type_digits-default`}>{item}</p>
            )
          })}
        </div>
      </div>
      <div className={styles.totalCounterWrapper}>
        <h3 className={'text text_type_main-medium'}>Выполнено за все время:</h3>
        <p className={`text text_type_digits-large ${styles.totalCounterNumber}`}>{addThouthandSpace(total)}</p>
      </div>
      <div className={styles.todayCounterWrapper}>
        <h3 className={'text text_type_main-medium'}>Выполнено за сегодня:</h3>
        <p className={`text text_type_digits-large ${styles.todayCounterNumber}`}>{totalToday}</p>
      </div>
    </div>
  )
}

export default OrderCounter;
