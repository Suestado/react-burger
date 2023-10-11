import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';
import styles from './burgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modals/Modal/Modal';
import OrderDetails from '../Modals/OrderDetails/OrderDetails';
import { getOrderStatus, clearOrderStatus } from '../../services/actions/orderDetails_actions';
import EmptyBun from './ConstructorElementsEmpty/EmptyBun/EmptyBun';
import EmptyFillings from './ConstructorElementsEmpty/EmptyFillings/EmptyFillings';
import {
  putBurgerBun,
  replaceBurgerBun,
  putBurgerFilling,
  deleteBurgerFilling,
} from '../../services/actions/burgerConstructor_actions';

function BurgerConstructor() {
  const { customerBurgerIngredients } = useSelector((store) => store.customerBurger);
  const { orderNumber,  orderRequestFailure} = useSelector((store) => store.orderStatus);
  // const [detailsOpened, setDetailsOpened] = useState(false);
  const dispatch = useDispatch();

  const [{ isHoverBunTop }, dropTargetBunTop] = useDrop({
    accept: 'bun',
    drop(item) {
      onDropHandlerBun(item);
    },
    collect: monitor => ({
      isHoverBunTop: monitor.isOver(),
    }),
  });

  const [{ isHoverBunBottom }, dropTargetBunBottom] = useDrop({
    accept: 'bun',
    drop(item) {
      onDropHandlerBun(item);
    },
    collect: monitor => ({
      isHoverBunBottom: monitor.isOver(),
    }),
  });

  const [{ isHoverFillings }, dropTargetFillings] = useDrop({
    accept: 'fillings',
    drop(item) {
      onDropHandlerFillings(item);
    },
    collect: monitor => ({
      isHoverFillings: monitor.isOver(),
    }),
  });

  function onDropHandlerBun(item) {
    if (customerBurgerIngredients.some((item) => item.type === 'bun')) {
      dispatch(replaceBurgerBun(item));
    } else {
      dispatch(putBurgerBun(item));
    }
  }

  function onDropHandlerFillings(item) {
    dispatch(putBurgerFilling(item));
  }

  function onDeleteFillings(fillingIngredientIndex) {
    dispatch(deleteBurgerFilling(fillingIngredientIndex));
  }

  function openModal() {
    const ingredients = customerBurgerIngredients.map((item) => {
      return item._id;
    });

    dispatch(getOrderStatus(ingredients));
  }

  function closeModal(evt) {
    evt.stopPropagation();
    dispatch(clearOrderStatus())
  }

  const isBunPlaseEmpty = !customerBurgerIngredients.some((item) => item.type === 'bun');
  const fillingsListEmpty = !customerBurgerIngredients.some((item) => item.type !== 'bun');
  const bunIsHovered = isHoverBunTop || isHoverBunBottom ? styles.hoveredContainer : '';
  const fillingsIsHovered = isHoverFillings ? styles.hoveredContainer : '';

  return (
    <section className={styles.ingredientsSection}>

      <div
        className={`${styles.fixIngredientsContainer} ${bunIsHovered}`}
        ref={dropTargetBunTop}
      >
        {isBunPlaseEmpty ? <EmptyBun/> :
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${customerBurgerIngredients.find((item) => item.type === 'bun').name} (верх)`}
            price={customerBurgerIngredients.find((item) => item.type === 'bun').price}
            thumbnail={customerBurgerIngredients.find((item) => item.type === 'bun').image}
          />
        }
      </div>

      <div
        className={`${styles.ingredientsContainer} ${fillingsIsHovered}`}
        ref={dropTargetFillings}
      >
        {fillingsListEmpty ? <EmptyFillings/> :
          <>
            {customerBurgerIngredients.map((element, index) => {
              if (element.type !== 'bun') {
                return (
                  <div
                    key={nanoid()}
                    className={styles.ingredient}>
                    <div className={styles.dragIcon}>
                      <DragIcon type="primary"/>
                    </div>
                    <ConstructorElement
                      text={element.name}
                      price={element.price}
                      thumbnail={element.image}
                      handleClose={() => onDeleteFillings(index)}
                    />
                  </div>
                );
              }
            })}
          </>
        }
      </div>

      <div
        className={`${styles.fixIngredientsContainer} ${bunIsHovered}`}
        ref={dropTargetBunBottom}
      >
        {isBunPlaseEmpty ? <EmptyBun bottomClass={true}/> :
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${customerBurgerIngredients.find((item) => item.type === 'bun').name} (низ)`}
            price={customerBurgerIngredients.find((item) => item.type === 'bun').price}
            thumbnail={customerBurgerIngredients.find((item) => item.type === 'bun').image}
          />
        }
      </div>


      <div className={styles.orderContainer}>
        <div className={styles.priceTag}>
          <p className="text text_type_main-large">
            {customerBurgerIngredients.reduce((acc, currentElement) => {
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

      {orderNumber && <Modal
        closeModal={closeModal}
      >
        <OrderDetails
          orderNumber={orderNumber}
        />
      </Modal>
      }
    </section>
  );
}

export default BurgerConstructor;
