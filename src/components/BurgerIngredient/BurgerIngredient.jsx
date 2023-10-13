import { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import styles from './burgerIngredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_INGREDIENT_TYPES } from '../../utils/types';

const BurgerIngredient = memo(({ item, openModal }) => {

  const [{ isDragBun }, dragRefBun] = useDrag({
    type: 'bun',
    item: item,
    collect: monitor => ({
      isDragBun: monitor.isDragging(),
    }),
  });

  const [{ isDragFillings }, dragRefFillings] = useDrag({
    type: 'fillings',
    item: item,
    collect: monitor => ({
      isDragFillings: monitor.isDragging(),
    }),
  });

  const ingredientRef = item.type === 'bun' ? dragRefBun : dragRefFillings;
  const ingredientIsDragging = isDragFillings || isDragBun;
  const orderedCount = useSelector((store) => store.customerBurger.customerBurgerIngredients.reduce((acc, ingredient) => {
    return ingredient._id === item._id ? acc + 1 : acc;
  }, 0));

  return (
    <article
      className={`${styles.burgerIngredient} ${ingredientIsDragging && styles.isDragging}`}
      onClick={() => openModal(item)}
      ref={ingredientRef}
    >
      <img className={styles.picture} src={item.image} alt={item.name}/>
      <div className={styles.priceContainer}>
        <span className={`text text_type_digits-default ${styles.priceTag}`}>{item.price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <span className={`text text_type_main-default ${styles.description}`}>{item.name}</span>
      {orderedCount > 0 && <Counter count={orderedCount} size="default" extraClass="m-1"/>}

    </article>
  );
});

BurgerIngredient.propTypes = {
  item: PropTypes.shape(BURGER_INGREDIENT_TYPES),
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredient;
