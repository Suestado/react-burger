import React, { memo, FC } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import styles from './burgerIngredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientInterface} from "../../utils/commonTypes";

interface IBurgerIngredient {
  item: IngredientInterface,
};

const BurgerIngredient: FC<IBurgerIngredient> = ({ item }): React.ReactElement => {
  const location = useLocation();

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
  const ingredientIsDragging: boolean = isDragFillings || isDragBun;
  const orderedCount = useSelector((store: any) => store.customerBurger.customerBurgerIngredients.reduce((acc: number, ingredient: IngredientInterface) => {
    return ingredient._id === item._id ? acc + 1 : acc;
  }, 0));

  return (
    <Link to={`/ingredients/${item._id}`} className={styles.burgerIngredientLink} state={{ backgroundLocation: location }}>
      <article
        className={`${styles.burgerIngredient} ${ingredientIsDragging && styles.isDragging}`}
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
    </Link>
  );
};

export default memo(BurgerIngredient);
