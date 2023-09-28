import PropTypes from 'prop-types';
import styles from './ingredientDetails.module.css';
import { INGREDIENTS_DETAILS_TYPES } from '../../../utils/types';

function IngredientDetails({ ingredient }) {

  return (
    <article className={styles.ingredientWrapper}>
      <img className={styles.picture} src={ingredient.image_large} alt={ingredient.name}/>
      <p className={`text text_type_main-medium ${styles.header}`}>{ingredient.name}</p>
      <ul className={styles.nutrientsList}>
        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${styles.nutrientName}`}>Калории,ккал</p>
          <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{ingredient.calories}</p>
        </li>

        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${styles.nutrientName}`}>Белки, г</p>
          <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{ingredient.proteins}</p>
        </li>

        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${styles.nutrientName}`}>Жиры, г</p>
          <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{ingredient.fat}</p>
        </li>

        <li className={styles.nutrientBlock}>
          <p className={`text text_type_main-default ${styles.nutrientName}`}>Углеводы, г</p>
          <p className={`text text_type_digits-default ${styles.nutrientValue}`}>{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </article>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(INGREDIENTS_DETAILS_TYPES),
};

export default IngredientDetails;
