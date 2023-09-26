import { useState, useEffect } from 'react';
import styles from './burgerIngredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../Modals/ModalOverlay/ModalOverlay';
import Modal from '../Modals/Modal/Modal';
import IngredientDetails from '../Modals/IngredientDetails/IngredientDetails';

function BurgerIngredient({ item }) {
  const [detailsOpened, setDetailsOpened] = useState(false);

  function openModal() {
    setDetailsOpened(true);
  }

  function closeModal(evt) {
    evt.stopPropagation();
    setDetailsOpened(false);
  }

  return (
    <article
      className={styles.burgerIngredient}
      onClick={openModal}
    >
      <img className={styles.picture} src={item.image} alt={item.name}/>
      <div className={styles.priceContainer}>
        <span className={`text text_type_digits-default ${styles.priceTag}`}>{item.price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <span className={`text text_type_main-default ${styles.description}`}>{item.name}</span>
      <Counter count={1} size="default" extraClass="m-1"/>

      <ModalOverlay
        isOpen={detailsOpened}
        closeModal={closeModal}
      >
        <Modal
          title="Детали ингредиента"
          closeModal={closeModal}
        >
          <IngredientDetails
            ingredients={{
              image: item.image_large,
              name: item.name,
              calories: item.calories,
              proteins: item.proteins,
              fat: item.fat,
              carbohydrates: item.carbohydrates,
            }}
          />
        </Modal>
      </ModalOverlay>
    </article>
  );
}

export default BurgerIngredient;
