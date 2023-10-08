import { useSelector } from 'react-redux';
import { useEffect, useRef, memo } from 'react';
import styles from './ingredientsGroupBlock.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import { INGREDIENTS_GROUP_BLOCK_TYPES } from '../../utils/types';

const IngredientsGroupBlock = memo(({ title, type, id, handleHeadersRef }) => {
  const ingredientsList = useSelector((store) => store.ingredients.fullIngredientList);
  const ref = useRef(null);

  useEffect(() => {
    handleHeadersRef(ref, type);
  }, []);

  const sortedIngredientsList = ingredientsList.filter((item) => {
    return item.type === type;
  });

  return (
    <section className={styles.ingredientsGroupBlock}>
      <h2 className={styles.header} id={id} ref={ref}>{title}</h2>
      <div className={styles.container}>
        {sortedIngredientsList.map((item) => {
          return (
            <BurgerIngredient
              key={item._id}
              item={item}
            />
          );
        })}
      </div>
    </section>
  );
})

IngredientsGroupBlock.propTypes = INGREDIENTS_GROUP_BLOCK_TYPES;

export default IngredientsGroupBlock;
