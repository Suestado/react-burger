import { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './burgerIngredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modals/Modal/Modal';
import IngredientDetails from '../Modals/IngredientDetails/IngredientDetails';
import { BURGER_INGREDIENT_TYPES } from '../../utils/types';
import { getIngredient, deleteIngredient } from '../../services/actions/ingredientDetails_actions';

const BurgerIngredient = memo(({ item }) => {
  const [detailsOpened, setDetailsOpened] = useState(false);
  const dispatch = useDispatch();

  function openModal() {
    dispatch(getIngredient(item))
    setDetailsOpened(true);
  }

  function closeModal(evt) {
    dispatch(deleteIngredient(item))
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
        <IngredientDetails/>
      </Modal>
      }
    </article>
  );
})

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(BURGER_INGREDIENT_TYPES),
};

export default BurgerIngredient;