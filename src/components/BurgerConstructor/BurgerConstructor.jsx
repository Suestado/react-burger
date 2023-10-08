import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './burgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { baseData } from '../../utils/baseData';
import Modal from '../Modals/Modal/Modal';
import OrderDetails from '../Modals/OrderDetails/OrderDetails';
import getOrderStatus from '../../services/actions/orderDetails_actions';

function BurgerConstructor() {
  const fillingsList = [];
  const isFillingsEmpty = fillingsList.length === 0;
  const [detailsOpened, setDetailsOpened] = useState(false);
  const dispatch = useDispatch();

  function openModal() {
    dispatch(getOrderStatus()); //TODO добавить ингредиенты в запрос
    setDetailsOpened(true);
  }

  function closeModal(evt) {
    evt.stopPropagation();
    setDetailsOpened(false);
  }

  return (
    <section className={styles.ingredientsSection}>
      <div className={styles.fixIngredientsContainer}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${baseData[0].name} (верх)`}
          price={baseData[0].price}
          thumbnail={baseData[0].image}
        />
      </div>

      <div className={`${styles.ingredientsContainer} ${isFillingsEmpty && styles.ingredientsContainer_type_empty}`}>
        {fillingsList.map((element) => {
          return (
            <div
              key={element._id}
              className={styles.ingredient}>
              <div className={styles.dragIcon}>
                <DragIcon type="primary"/>
              </div>
              <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.fixIngredientsContainer}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${baseData[0].name} (низ)`}
          price={baseData[0].price}
          thumbnail={baseData[0].image}
        />
      </div>

      <div className={styles.orderContainer}>
        <div className={styles.priceTag}>
          <p className="text text_type_main-large">
            {baseData.reduce((acc, currentElement) => {
              return currentElement.price + acc;
            }, 0)}
          </p>
          <CurrencyIcon type="primary"/>
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
        >Оформить заказ</Button>
      </div>

      {detailsOpened && <Modal
        closeModal={closeModal}
      >
        <OrderDetails/>
      </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
