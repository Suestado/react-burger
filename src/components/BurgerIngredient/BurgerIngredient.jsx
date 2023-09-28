import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './burgerIngredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modals/Modal/Modal';
import IngredientDetails from '../Modals/IngredientDetails/IngredientDetails';
import { BURGER_INGREDIENT_TYPES } from '../../utils/types';

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
      {detailsOpened && <Modal
        title="Детали ингредиента"
        closeModal={closeModal}
      >
        <IngredientDetails
          ingredient={item}
        />
      </Modal>
      }
    </article>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(BURGER_INGREDIENT_TYPES),
};

export default BurgerIngredient;
