import styles from './burgerIngredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerIngredient({ item }) {
  return (
    <article className={styles.burgerIngredient}>
      <img className={styles.picture} src={item.image} alt=""/>
      <div className={styles.priceContainer}>
        <span className={`text text_type_digits-default ${styles.priceTag}`}>{item.price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <span className={`text text_type_main-default ${styles.description}`}>{item.name}</span>
    </article>
  );
}

export default BurgerIngredient;
