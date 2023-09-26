import { GlobalContext } from '../../context/GlobalContext';
import { useContext } from 'react';
import styles from './ingredientsGroupBlock.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

function IngredientsGroupBlock({ title, type, id }) {
  const { ingredientsList } = useContext(GlobalContext);
  const sortedIngredientsList = ingredientsList.filter((item) => {
    return item.type === type;
  });

  return (
    <section className={styles.ingredientsGroupBlock}>
      <h2 className={styles.header} id={id}>{title}</h2>
      <div className={styles.container}>
        {sortedIngredientsList.map((item) => {
          return <BurgerIngredient
            key={item._id}
            item={item}
          />
        })}
      </div>
    </section>
  );
}

export default IngredientsGroupBlock;
