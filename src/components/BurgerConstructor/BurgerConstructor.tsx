import { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import styles from './burgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modals/Modal/Modal';
import OrderDetails from '../Modals/OrderDetails/OrderDetails';
import { getOrderStatus, clearOrderStatus } from '../../services/actions/orderDetailsActions';
import EmptyBun from './ConstructorElementsEmpty/EmptyBun/EmptyBun';
import EmptyFillings from './ConstructorElementsEmpty/EmptyFillings/EmptyFillings';
import ConstructorElementFillings from './ConstructorElementFillings/ConstructorElementFillings';
import Preloader from '../Preloader/Preloader';
import {
  putBurgerBun,
  replaceBurgerBun,
  putBurgerFilling,
  replaceBurgerFilling,
} from '../../services/actions/burgerConstructorActions';
import {IngredientInterface} from "../../utils/commonTypes";

function BurgerConstructor() {
  const { customerBurgerIngredients } = useSelector((store: any) => store.customerBurger);
  const { orderRequestProcessing } = useSelector((store: any) => store.orderStatus);
  const { orderNumber } = useSelector((store: any) => store.orderStatus);
  const { isLoggedIn } = useSelector((store: any) => store.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [{ isHoverBunTop }, dropTargetBunTop] = useDrop({
    accept: 'bun',
    drop(item: IngredientInterface) {
      onDropHandlerBun(item);
    },
    collect: monitor => ({
      isHoverBunTop: monitor.isOver(),
    }),
  });

  const [{ isHoverBunBottom }, dropTargetBunBottom] = useDrop({
    accept: 'bun',
    drop(item: IngredientInterface) {
      onDropHandlerBun(item);
    },
    collect: monitor => ({
      isHoverBunBottom: monitor.isOver(),
    }),
  });

  const [{ isHoverFillings }, dropTargetFillings] = useDrop({
    accept: 'fillings',
    drop(item: IngredientInterface) {
      onDropHandlerFillings(item);
    },
    collect: monitor => ({
      isHoverFillings: monitor.isOver(),
    }),
  });

  type TonDropHandlerBun = (
    item: {
      type: string
    }
  ) => void;

  const onDropHandlerBun: TonDropHandlerBun = (item) => {
    if (customerBurgerIngredients.some((item: {type: string}) => item.type === 'bun')) {
      dispatch(replaceBurgerBun(item));
    } else {
      dispatch(putBurgerBun(item));
    }
  }

  type TonDropHandlerFillings = (item: IngredientInterface) => void;
  const onDropHandlerFillings: TonDropHandlerFillings = (item) => {
    dispatch(putBurgerFilling(item));
  }

  function submitOrder(): void {
    const ingredients: IngredientInterface[] = customerBurgerIngredients.map((item: IngredientInterface) => {
      return item._id;
    });

    if (isLoggedIn) {
      dispatch(getOrderStatus(ingredients)); //TODO почему здесь ошибка? В других местах по коду dispatch нормально отрабатывал
    } else {
      navigate('/login');
    }

  }

  function closeModal(): void {
    dispatch(clearOrderStatus());
  }

  type TonReplaceFillings = (dragIndex: number, dropIndex: number) => void;
  const onReplaceFillings = useCallback<TonReplaceFillings>((dragIndex, dropIndex) => {
    const newFillingsList = [...customerBurgerIngredients];
    newFillingsList.splice(dragIndex, 1);
    newFillingsList.splice(dropIndex, 0, customerBurgerIngredients[dragIndex]);

    dispatch(replaceBurgerFilling(newFillingsList));
  }, [customerBurgerIngredients]);

  const isBunPlaseEmpty: boolean = !customerBurgerIngredients.some((item: IngredientInterface) => item.type === 'bun');
  const fillingsListEmpty: boolean = !customerBurgerIngredients.some((item: IngredientInterface) => item.type !== 'bun');
  const bunIsHovered: string = isHoverBunTop || isHoverBunBottom ? styles.hoveredContainer : '';
  const fillingsIsHovered: string = isHoverFillings ? styles.hoveredContainer : '';
  const orderCompleted: boolean =
    customerBurgerIngredients.some((ingredient: IngredientInterface) => ingredient.type === 'bun')
    && customerBurgerIngredients.some((ingredient: IngredientInterface) => ingredient.type === 'sauce' || ingredient.type === 'main');

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
            text={`${customerBurgerIngredients.find((item: IngredientInterface) => item.type === 'bun').name} (верх)`}
            price={customerBurgerIngredients.find((item: IngredientInterface) => item.type === 'bun').price}
            thumbnail={customerBurgerIngredients.find((item: IngredientInterface) => item.type === 'bun').image}
          />
        }
      </div>

      <div
        className={`${styles.ingredientsContainer} ${fillingsIsHovered}`}
        ref={dropTargetFillings}
      >
        {fillingsListEmpty ? <EmptyFillings/> :
          <>
            {customerBurgerIngredients.map((item: IngredientInterface, index: number) => {
              if (item.type !== 'bun') {
                return (
                  <ConstructorElementFillings
                    key={item.id}
                    item={item}
                    index={index}
                    onReplaceFillings={onReplaceFillings}
                  />
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
            text={`${customerBurgerIngredients.find((item: IngredientInterface) => item.type === 'bun').name} (низ)`}
            price={customerBurgerIngredients.find((item: IngredientInterface) => item.type === 'bun').price}
            thumbnail={customerBurgerIngredients.find((item: IngredientInterface) => item.type === 'bun').image}
          />
        }
      </div>

      <div className={styles.orderContainer}>
        <div className={styles.priceTag}>
          <p className="text text_type_main-large">
            {customerBurgerIngredients.reduce((acc: number, currentElement: IngredientInterface) => {
              return currentElement.price + acc;
            }, 0)}
          </p>
          <CurrencyIcon type="primary"/>
        </div>
        {orderCompleted ?
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={submitOrder}
          >Оформить заказ</Button>
          : <div className={`text text_type_main-default ${styles.submitDisabled}`}>Оформить заказ</div>
        }
      </div>

      {orderRequestProcessing && <Preloader/>}

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

export default memo(BurgerConstructor);
